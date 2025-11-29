import React from "react";
import CategoriaProductosClient from "./CategoriaProductosClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CategoriaProductosClient id={id} />;
}
