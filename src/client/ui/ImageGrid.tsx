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
      <h1 className="ml-5 text-4xl text-primary s_window:ml-9">Included</h1>
      <div className="overflow-hidden rounded-r-2xl">
        <div className="grid grid-cols-1 m_window:grid-cols-2 xl_window:grid-cols-3">
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
