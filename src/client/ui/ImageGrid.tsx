import type { RefObject } from "react";

export default function ImageGrid({
  imageArray,
  imgPath,
  className,
  sectionRef,
}: {
  imageArray: Array<string>;
  imgPath: string;
  className: string;
  sectionRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    /* xl_window:-mt-48 l_window:-mt-44 m_window:-mt-40 s_window:-mt-32 -mt-28 */
    <section ref={sectionRef} className={className}>
      <h1 className="bg-centerLBg place-self-start rounded-tr-3xl pl-3 pr-6 pt-2 font-serif text-4xl text-white">
        Included
      </h1>
      <div className="border-centerLBg overflow-hidden rounded-r-3xl border-[11px]">
        <div className="grid grid-cols-1 duration-300 m_window:grid-cols-2 xl_window:grid-cols-3">
          {imageArray.map((img, i) => (
            <img
              className={i === 2 ? "hidden xl_window:flex" : ""}
              key={i}
              src={`${imgPath}/tours/${img}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
