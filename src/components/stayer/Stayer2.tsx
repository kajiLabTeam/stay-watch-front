import React, { FC, useState } from "react";

export const Stayer2 = () => {
  return (
    <div className="mt-4 w-11/12">
      <div className="text-3xl">滞在者一覧</div>
      <div className="my-4 border" />
      <div className="grid grid-cols-3">
        <div className="bg-gray-700 border ">Name</div>
        <div>Attribute</div>
        <div>Room</div>
      </div>
    </div>
  );
};
