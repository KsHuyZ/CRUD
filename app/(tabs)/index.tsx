import { TProducts, useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const { products, addProduct, deleteProductById, updateProductById } =
    useProducts();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState<TProducts | undefined>(undefined);
  const createProduct = async () => {
    if (product) {
      await updateProductById({ _id: product._id, name, type, price });
    } else {
      await addProduct({ name, type, price });
    }
    setName("");
    setType("");
    setPrice(0);
    setProduct(undefined);
  };

  const onSelect = (prod: TProducts) => {
    const { name, price, type, _id } = prod;
    setName(name);
    setPrice(price);
    setType(type);
    setProduct(prod);
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Product Data</Text>
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          marginTop: 20,
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Enter product name"
          style={{
            borderWidth: 1,
            padding: 10,
            width: "100%",
            borderRadius: 20,
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Enter product type"
          style={{
            borderWidth: 1,
            padding: 10,
            width: "100%",
            borderRadius: 20,
          }}
          value={type}
          onChangeText={(text) => setType(text)}
        />
        <TextInput
          placeholder="Enter product price"
          style={{
            borderWidth: 1,
            padding: 10,
            width: "100%",
            borderRadius: 20,
          }}
          value={price.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(Number(text))}
        />
        <TouchableOpacity
          style={{ backgroundColor: "black", padding: 10, borderRadius: 20 }}
          onPress={createProduct}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            {product ? "Update Product" : "Add Product"}
          </Text>
        </TouchableOpacity>

        <ScrollView style={{ flexDirection: "column", gap: 20 }}>
          {products.map((product) => (
            <View
              style={{ borderWidth: 1, borderRadius: 20, padding: 10 }}
              key={product._id}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                  {product.name}
                </Text>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <View style={{ flexDirection: "column", gap: 5 }}>
                    <Text>{product.type}</Text>
                    <Text>{product.price} đ</Text>
                  </View>
                  <View style={{ flexDirection: "column", gap: 5 }}>
                    <Text onPress={() => onSelect(product)}>Edit</Text>
                    <Text
                      style={{ color: "red" }}
                      onPress={() => deleteProductById(product._id ?? "")}
                    >
                      Delete
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
