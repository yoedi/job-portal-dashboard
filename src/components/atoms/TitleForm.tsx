import React, { FC } from "react";

interface TitleFormProps {
  title: string;
  subTitle: string;
}

const TitleForm: FC<TitleFormProps> = ({ title, subTitle }) => {
  return (
    <>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-gray-400">{subTitle}</div>
    </>
  );
};

export default TitleForm;
