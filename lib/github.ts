const GITHUB_API_BASE = "https://api.github.com";

export interface GitHubUser {
  avatar_url: string;
  bio: string | null;
  blog: string;
  company: string | null;
  created_at: string;
  email: string | null;
  followers: number;
  following: number;
  html_url: string;
  id: number;
  location: string | null;
  login: string;
  name: string | null;
  public_gists: number;
  public_repos: number;
  updated_at: string;
}

export interface GitHubRepository {
  archived: boolean;
  description: string | null;
  fork: boolean;
  forks_count: number;
  html_url: string;
  language: string | null;
  name: string;
  size: number;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  visibility: "public" | "private";
}

export interface GitHubRepositoryReadme {
  content: string;
  repository: string;
}

export async function getGitHubUser(
  username: string,
): Promise<GitHubUser> {
  const normalizedUsername = username.trim();

  if (!normalizedUsername) {
    throw new Error("A GitHub username is required.");
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/users/${encodeURIComponent(normalizedUsername)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    throw new Error(
      `GitHub user "${normalizedUsername}" does not exist.`,
    );
  }

  if (response.status === 403) {
    throw new Error(
      "GitHub API rate limit exceeded. Please try again later.",
    );
  }

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed with status ${response.status}.`,
    );
  }

  return (await response.json()) as GitHubUser;
}

export async function getGitHubRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  const normalizedUsername = username.trim();

  if (!normalizedUsername) {
    throw new Error("A GitHub username is required.");
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/users/${encodeURIComponent(normalizedUsername)}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    throw new Error(`GitHub user "${normalizedUsername}" does not exist.`);
  }

  if (response.status === 403) {
    throw new Error("GitHub API rate limit exceeded. Please try again later.");
  }

  if (!response.ok) {
    throw new Error(`GitHub repository request failed with status ${response.status}.`);
  }

  return (await response.json()) as GitHubRepository[];
}

export async function getGitHubRepositoryReadmes(
  username: string,
  repositories: GitHubRepository[],
): Promise<GitHubRepositoryReadme[]> {
  const normalizedUsername = username.trim();
  const selectedRepositories = repositories
    .filter((repository) => !repository.archived && !repository.fork)
    .slice(0, 5);

  const readmes = await Promise.all(
    selectedRepositories.map(async (repository) => {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${encodeURIComponent(normalizedUsername)}/${encodeURIComponent(repository.name)}/readme`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          cache: "no-store",
        },
      );

      if (!response.ok) return null;

      const data = (await response.json()) as {
        content?: string;
        encoding?: string;
      };
      if (data.encoding !== "base64" || !data.content) return null;

      return {
        repository: repository.name,
        content: Buffer.from(data.content.replace(/\n/g, ""), "base64")
          .toString("utf8")
          .slice(0, 4000),
      };
    }),
  );

  return readmes.filter((readme): readme is GitHubRepositoryReadme => readme !== null);
}
