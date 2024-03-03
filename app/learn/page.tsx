"use client";
import CircleElement from "./(svg)/circle";
import Rectangle from "./(svg)/rectangle";
import { Circle, DRAWING_BOOK_DATA } from "./(svg)/types";
import { addToLocalStorage, getItemFromLocalStorage } from "./(svg)/utils";
import { useState, useEffect } from "react";

export default function LearnHomePage() {
  const [svgElementsInfo, setsvgElementsInfo] = useState([]);

  useEffect(() => {
    let data = window.localStorage.getItem(DRAWING_BOOK_DATA);
    if (!data) {
      window.localStorage.setItem(DRAWING_BOOK_DATA, "[]");
    } else {
      setsvgElementsInfo(
        JSON.parse(window.localStorage.getItem(DRAWING_BOOK_DATA) || "[]"),
      );
    }
  }, []);

  console.log(svgElementsInfo);
  const insertShape = function (event: React.MouseEvent<SVGElement>) {
    console.log(insertShape);
    // const circleObj = {
    //   cx: event.clientX,
    //   cy: event.clientY,
    //   radius: 30,
    //   stroke: 'black',
    //   strokeWidth: 2,
    //   fill: "red"
    // }
    const rectangleObject = {
      x: event.clientX,
      y: event.clientY,
      width: 200,
      height: 50,
      rx: 0,
      ry: 2,
      stroke: "black",
      strokeWidth: 1,
      fill: "green",
    };
    addToLocalStorage(DRAWING_BOOK_DATA, {
      type: 1,
      element: rectangleObject,
    });
    setsvgElementsInfo(getItemFromLocalStorage(DRAWING_BOOK_DATA));
  };

  return (
    <main className="h-full bg-red-300">
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        onClick={insertShape}
      >
        {svgElementsInfo?.map((shape: { type: number; element: Circle }) => {
          if (shape.type === 1) {
            return <Rectangle {...shape.element} />;
          }
        })}
      </svg>
    </main>
  );
}
