import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import CardTile from "../components/CardTile";
import Search from "../components/Search";

export default function HomeScreen({ navigation }) {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    setLoading(true);
    async function getListOfMovies() {
      const apiRes = await fetch(
        "https://imdb-top-100-movies.p.rapidapi.com/",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "e9b4852aecmsh7ce096eff5f970ep1172ecjsnbb81d0852fad",
            "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
          },
        }
      );

      const result = await apiRes.json();

      if (result) {
        setLoading(false);
        setMovieList(result);
      }
    }

    getListOfMovies();
  }, []);

  console.log(loading); 

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    return () => {};
  }, [navigation]);

  if (loading) {
    return (
      <ActivityIndicator color={"red"} style={{ flex: 1 }} size={"large"} />
    );
  }

  const filteredMovieList =
    text && text.trim() !== ""
      ? movieList.filter((item) => item.title.toLowerCase().includes(text))
      : movieList;

  return (
    <View style={styles.container}>
      <Search text={text} setText={setText} />
      <FlatList
        data={filteredMovieList || []}
        renderItem={({ item }) => (
          <CardTile navigation={navigation} item={item} />
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
