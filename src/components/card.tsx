import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { IProduct } from "../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { addToCart } from "../api/cartApi";
import { currencyFormatter } from "../utils/currency-formatter";
import { useState } from "react";

export const CardComponent: React.FC<{ product: IProduct }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  async function handleAddToCart() {
    if (!token) {
      toast.error("Signin to add to cart");

      setTimeout(() => {
        navigate("/signin");
      }, 500);
    } else {
      await addToCart(product.id, quantity)
        .then((response) => {
          const data = response.data;
          data.status === "Success"
            ? toast.success(data.message)
            : toast.error(data.message);
        })
        .catch((err: any) => {
          toast.error(err.response?.data?.error[0]?.message);
          setToken(null);

          setTimeout(() => {
            navigate("/signin");
          }, 500);
        });
    }
  }

  return (
    <Card
      className="mt-6 w-96"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        color="blue-gray"
        className="relative h-56"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <img src={product.thumbnail} alt="card-image" className="h-" />
      </CardHeader>
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {product.title}
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {product.description}
        </Typography>
        <Typography
          className="pt-5 font-bold text-black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {`Rs. ${currencyFormatter(product.price)}`}{" "}
        </Typography>
          <em className="text-sm"> (stock{" "}{ product.stock})</em>
      </CardBody>
      <CardFooter
        className="pt-0 flex gap-6"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          className="hover:bg-white hover:text-black hover:shadow-md hover:shadow-gray-600 hover:border-2 border-2 h-14"
          onClick={handleAddToCart}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add to Cart
        </Button>
        <div className="w-28 ms-10">
          <div className="relative w-min-0 mt-2">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "min-w-0",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <div className="absolute right-1 top-1 flex gap-0.5">
              <IconButton
                size="sm"
                className="rounded"
                onClick={() => setQuantity((cur) => (cur === 1 ? 1 : cur - 1))}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                </svg>
              </IconButton>
              <IconButton
                size="sm"
                className="rounded"
                onClick={() => setQuantity((cur) => cur + 1)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
