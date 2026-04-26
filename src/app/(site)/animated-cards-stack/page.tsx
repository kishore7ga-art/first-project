import { TestimonialsVariant, AwardsVariant, ImagesVariant } from "./demo";

export default function AnimatedCardsPage() {
  return (
    <div className="w-full flex flex-col gap-12 py-12">
      <TestimonialsVariant />
      <AwardsVariant />
      <ImagesVariant />
    </div>
  );
}
