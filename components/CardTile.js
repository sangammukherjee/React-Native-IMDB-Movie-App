import { Text, View, Image, StyleSheet, Button } from "react-native";

export default function CardTile({ navigation, item, isDetailsPage }) {
  return (
    <View>
      <View
        style={{
          ...styles.mainCardStyles,
          height: isDetailsPage ? "auto" : 250,
          flexDirection: isDetailsPage ? "column" : "row",
          paddingTop: isDetailsPage ? 40 : 10,
          paddingBottom: isDetailsPage ? 40 : 10,
        }}
      >
        <View>
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode={isDetailsPage ? "cover" : "contain"}
            style={{
              borderRadius: 4,
              height: isDetailsPage ? 200 : "100%",
              width: isDetailsPage ? "100%" : 150,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: 12,
            flex: isDetailsPage ? 0 : 1,
            justifyContent: isDetailsPage ? "flex-start" : "center",
          }}
        >
          <Text
            style={{
              fontSize: isDetailsPage ? 25 : 14,
              color: "#000000",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${item.rank}. ${item.title}`}
          </Text>
          {isDetailsPage && (
            <View
              style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}
            >
              <View style={{ marginRight: 15 }}>
                <Text style={{ color: "red", fontSize: 20 }}>
                  {item.rating}
                </Text>
              </View>
              <View>
                <Text style={{ color: "red", fontSize: 20 }}>{item.year}</Text>
              </View>
            </View>
          )}
          {isDetailsPage && (
            <View style={{ marginTop: 6 }}>
              <Text style={{ color: "gray", fontSize: 18 }}>
                {item.description}
              </Text>
            </View>
          )}
          {isDetailsPage && (
            <View style={{ marginTop: 5 }}>
              <Text
                style={{ fontSize: 14, color: "#000" }}
              >{`${item.genre[0]} | ${item.director[0]}`}</Text>
            </View>
          )}
          {isDetailsPage ? null : (
            <View style={{ marginTop: 12 }}>
              <Button
                onPress={() => navigation.navigate("Details", { id: item.id })}
                title="Details"
                color={"red"}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCardStyles: {
    height: 250,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 8,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
});
