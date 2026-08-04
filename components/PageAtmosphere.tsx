export default function PageAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(215,255,84,0.09),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute -right-40 top-1/3 size-[28rem] rounded-full bg-[#d7ff54]/[0.035] blur-[110px]" />
      <div className="absolute -left-44 bottom-0 size-[24rem] rounded-full bg-indigo-500/[0.035] blur-[110px]" />
    </div>
  );
}
