import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface IPaginationProps {
  totalNumber: number;
  skipState: {
    skip: number;
    setSkip: Dispatch<SetStateAction<number>>;
  };
}

export const Pagination: React.FC<IPaginationProps> = ({
  totalNumber,
  skipState,
}) => {
  const [active, setActive] = useState<number>(1);

  const getItemProps = (index: any) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        setActive(index);
        const newSkipState = (index - 1) * 9;
        skipState.setSkip(newSkipState);
      },
    } as any);

  const next = () => {
    if (active === totalNumber) return;

    setActive(active + 1);

    const nextSkip = skipState.skip + 9;
    skipState.setSkip(nextSkip);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);

    const prevSkip = skipState.skip - 9;
    skipState.setSkip(prevSkip);
  };

  let totalIcon: JSX.Element[] = [];

  for (let i = 1; i <= totalNumber; i++) {
    totalIcon.push(
      <IconButton key={i} {...getItemProps(i)}>
        {i}
      </IconButton>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 0}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{totalIcon}</div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalNumber}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};
