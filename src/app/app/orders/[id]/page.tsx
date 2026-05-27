import OrderDetailClient from "./OrderDetailClient";

// Pre-render these order IDs for static export.
// The Orders list page links to these specific IDs.
export function generateStaticParams() {
  return [
    { id: "klyd-3829" },
    { id: "klyd-3781" },
    { id: "klyd-3702" },
  ];
}

export default async function OrderDetail(props: PageProps<"/app/orders/[id]">) {
  const { id } = await props.params;
  return <OrderDetailClient id={id} />;
}
