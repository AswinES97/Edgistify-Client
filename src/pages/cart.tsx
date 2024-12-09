import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { cartData } from "../api/cartApi";
import { currencyFormatter } from "../utils/currency-formatter";
import { placeOrder } from "../api/orderApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const TABLE_HEAD = ["No.", "Name", "Quantity", "Price", "Total Price"];

const CartPage = () => {
  const { setToken } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await cartData();
      if (response.data.length === 0) {
        toast(response.message);
      }
      setProducts(response.data);
    }
    fetchData();
  }, []);

  let grandTotalValue = 0;

  if (products.length > 0) {
    products.forEach((product: any) => {
      const indianRs = currencyFormatter(product.price);
      const currentProductTotal = indianRs * product.quantity;
      grandTotalValue += currentProductTotal;
    });
  }

  const handlePlaceOrder = async () => {
    await placeOrder()
      .then((res) => {
        if (res.status === "Error") {
          toast.error(res.message);

          let outOfStock = "";

          res.data.forEach((product: any, index: any) => {
            outOfStock += `${index + 1}. ${product.title} \n`;
          });

          setTimeout(() => {
            toast.error(outOfStock);
          }, 300);
        }

        if (res.status === "Success") {
          toast.success(res.message);

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => {
        setToken(null);

        setTimeout(() => {
          navigate("/signin");
        }, 500);
      });
  };

  return (
    <div className="w-screen bg-white h-screen mt-20 flex flex-col justify-center">
      <div className="w-full flex justify-center">
        <Card
          className="h-full md:w-[60rem] py-5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="w-full md:min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(({ title, quantity, price, stock }, index) => {
                const isLast = index === products.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index + 1}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {`Rs.${currencyFormatter(price)}`}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {`Rs.${currencyFormatter(price) * quantity}`}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="pt-5 font-bold">Grand Total:</td>
                <td className="pt-5 font-bold">{`Rs.${grandTotalValue}`}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
      <div className="w-full flex md:justify-end justify-center py-7">
        <button
          onClick={handlePlaceOrder}
          className="font-bold border-2 bg-black text-white rounded-lg p-3 md:me-80 hover:bg-white hover:text-black hover:border-black hover:border-2"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
