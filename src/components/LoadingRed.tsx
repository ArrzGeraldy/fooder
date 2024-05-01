import { cn } from "@/lib/utils";

const LoadingRed = ({ style }: { style: string }) => {
  return <div className={cn("loader-pulse", style)}></div>;
};

export default LoadingRed;
