import Image from "next/image";

function EmmanuellaTestimonial() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 gradient-bg">
      <div className="w-full">
        <Image
          src="/img/testimonialBox.png"
          alt="Testimonial Box"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

export default EmmanuellaTestimonial;
