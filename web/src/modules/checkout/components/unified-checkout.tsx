"use client";

import { useForm, Controller } from "react-hook-form";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCheckout } from "../context/checkout-context";
import { useCart } from "@/modules/cart/context/cart-context";
import { getCountries } from "@/lib/countries";
import { TAX_RATE } from "@/config/constants";
import { useLanguage } from "@/hooks/LanguageContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import "./unified-checkout.css";

interface CheckoutFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  mobileNumber: string;
}

export function UnifiedCheckout() {
  const { setShippingAddress, setPaymentMethod } = useCheckout();
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CheckoutFormData>();

  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shippingPrice: number = itemsPrice > 100 ? 0 : 0;
  const taxPrice = Number((itemsPrice * TAX_RATE).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // 1. Save shipping address
      const shippingResponse = await apiClient.post("/cart/shipping", data);
      const shippingAddress = shippingResponse.data;
      setShippingAddress(shippingAddress);

      // 2. Save payment method (BOG by default)
      const paymentResponse = await apiClient.post("/cart/payment", {
        paymentMethod: "BOG",
      });
      setPaymentMethod(paymentResponse.data);

      // 3. Create order
      const orderItems = items.map((item) => ({
        name: item.name,
        nameEn: item.nameEn,
        qty: item.qty,
        image: item.image,
        price: item.price,
        productId: item.productId,
        size: item.size,
        color: item.color,
        ageGroup: item.ageGroup,
      }));

      const orderResponse = await apiClient.post("/orders", {
        orderItems,
        shippingDetails: shippingAddress,
        paymentMethod: "BOG",
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      await clearCart();
      router.push(`/orders/${orderResponse.data._id}`);
    } catch (error) {
      console.log(error);
      toast({
        title: "შეცდომა",
        description: "გთხოვთ სცადოთ თავიდან.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="unified-checkout-empty">
        <p>კალათა ცარიელია</p>
        <Link href="/shop" className="back-to-shop-link">
          პროდუქტების ნახვა
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="unified-checkout-grid">
      {/* Left Column - Shipping Form + Order Items */}
      <div className="checkout-left">
        {/* Shipping Form */}
        <div className="checkout-card">
          <h2 className="checkout-section-title">მიწოდების მისამართი</h2>

          <div className="checkout-form-fields">
            <div className="checkout-form-field">
              <label htmlFor="address">მისამართი</label>
              <input
                id="address"
                {...register("address", {
                  required: "მისამართი სავალდებულოა",
                })}
                placeholder="მაგ: რუსთაველის გამზ. 12"
              />
              {errors.address && (
                <p className="error-text">{errors.address.message}</p>
              )}
            </div>

            <div className="checkout-form-row">
              <div className="checkout-form-field">
                <label htmlFor="city">ქალაქი</label>
                <input
                  id="city"
                  {...register("city", {
                    required: "ქალაქი სავალდებულოა",
                  })}
                  placeholder="მაგ: თბილისი"
                />
                {errors.city && (
                  <p className="error-text">{errors.city.message}</p>
                )}
              </div>

              <div className="checkout-form-field">
                <label htmlFor="postalCode">საფოსტო კოდი</label>
                <input
                  id="postalCode"
                  {...register("postalCode", {
                    required: "საფოსტო კოდი სავალდებულოა",
                  })}
                  placeholder="მაგ: 0100"
                />
                {errors.postalCode && (
                  <p className="error-text">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div className="checkout-form-field">
              <label htmlFor="mobileNumber">მობილურის ნომერი</label>
              <input
                id="mobileNumber"
                {...register("mobileNumber", {
                  required: "მობილურის ნომერი სავალდებულოა",
                })}
                placeholder="+995 5XX XXX XXX"
              />
              {errors.mobileNumber && (
                <p className="error-text">{errors.mobileNumber.message}</p>
              )}
            </div>

            <div className="checkout-form-field">
              <label htmlFor="country">ქვეყანა</label>
              <Controller
                name="country"
                control={control}
                rules={{ required: "ქვეყანა სავალდებულოა" }}
                render={({ field }) => (
                  <select {...field} defaultValue="">
                    <option value="" disabled>
                      აირჩიეთ ქვეყანა
                    </option>
                    {getCountries().map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.country && (
                <p className="error-text">{errors.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="checkout-card">
          <h2 className="checkout-section-title">შეკვეთის პროდუქტები</h2>
          <div className="checkout-order-items">
            {items.map((item) => {
              const displayName =
                language === "en" && item.nameEn ? item.nameEn : item.name;

              return (
                <div
                  key={`${item.productId}-${item.color ?? "c"}-${
                    item.size ?? "s"
                  }-${item.ageGroup ?? "a"}`}
                  className="checkout-order-item"
                >
                  <div className="checkout-item-image">
                    <Image
                      src={item.image}
                      alt={displayName}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="checkout-item-details">
                    <Link
                      href={`/products/${item.productId}`}
                      className="checkout-item-name"
                    >
                      {displayName}
                    </Link>
                    {(item.size || item.color || item.ageGroup) && (
                      <div className="checkout-item-variants">
                        {item.size && <span>ზომა: {item.size}</span>}
                        {item.color && <span>ფერი: {item.color}</span>}
                        {item.ageGroup && <span>ასაკი: {item.ageGroup}</span>}
                      </div>
                    )}
                    <p className="checkout-item-price">
                      {item.qty} x {formatPrice(item.price)} ={" "}
                      {formatPrice(item.qty * item.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="checkout-right">
        <div className="checkout-card checkout-summary-card">
          <h2 className="checkout-section-title">შეკვეთის ჯამი</h2>
          <div className="checkout-summary-details">
            <div className="checkout-summary-row">
              <span className="checkout-summary-label">პროდუქტები</span>
              <span>{formatPrice(itemsPrice)}</span>
            </div>
            <div className="checkout-summary-row">
              <span className="checkout-summary-label">მიწოდება</span>
              <span>
                {shippingPrice === 0 ? "უფასო" : formatPrice(shippingPrice)}
              </span>
            </div>
            <div className="checkout-summary-row">
              <span className="checkout-summary-label">საკომისიო</span>
              <span>{formatPrice(taxPrice)}</span>
            </div>
            <div className="checkout-summary-separator" />
            <div className="checkout-summary-row checkout-summary-total">
              <span>ჯამი</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="checkout-payment-info">
              <svg
                className="checkout-payment-icon"
                viewBox="0 0 24 24"
                fill="green"
                width={18}
                height={18}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>ნებისმიერი ბარათით გადახდა</span>
            </div>

            <button
              type="submit"
              className="checkout-place-order-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "მუშავდება..." : "შეკვეთის გაფორმება"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
