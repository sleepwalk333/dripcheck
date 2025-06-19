import pins from "@/assets/data/pins";
import MasonryList from '@/components/MasonryList';

export default function Home() {
  return <MasonryList pins={pins} />;
};