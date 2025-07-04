import Image from "next/image";

function Logo() {
  return (
    <section>
      <figure>
        <Image
          src="/Flux_Dev_a_highly_detailed_ultrahighresolution_illustration_of_2.jpg"
          className="h-16 w-16 dark:invert"
          alt="Waveel POS logo"
          width={30}
          height={30}
        />
      </figure>
    </section>
  );
}

export default Logo;
