//Tiffany yav
//ST10251882 
//MAST5112-POE-Part1

import React, {useState, useEffect} from 'react';
import {
  View, 
  Text,
  TextInput, 
  StyleSheet, 
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import {Alert} from 'react-native';


const genreList = [
  {id: '1' ,name: 'Action and adventure', category: 'Fiction', count: 0},
  {id: '2' ,name: 'Alternate history', category: 'Fiction', count: 0},
  {id: '3' ,name: 'Anthology', category: 'Fiction', count: 0},
  {id: '4' ,name: 'Chick lit', category: 'Fiction', count: 0},
  {id: '5' ,name: 'Children', category: 'Fiction', count: 0},
  {id: '6' ,name: 'Classic', category: 'Fiction', count: 0},
  {id: '7' ,name: 'Comic book', category: 'Fiction', count: 0},
  {id: '8' ,name: 'Coming-of-age', category: 'Fiction', count: 0},
  {id: '9' ,name: 'Crime', category: 'Fiction', count: 0},
  {id: '10' ,name: 'Drama', category: 'Fiction', count: 0},
  {id: '11' ,name: 'Fairytale', category: 'Fiction', count: 0},
  {id: '12' ,name: 'Fantasy', category: 'Fiction', count: 0},
  {id: '13' ,name: 'Graphic novel', category: 'Fiction', count: 0},
  {id: '14' ,name: 'Historical fiction', category: 'Fiction', count: 0},
  {id: '15' ,name: 'Horror', category: 'Fiction', count: 0},
  {id: '16' ,name: 'Mystery', category: 'Fiction', count: 0},
  {id: '17' ,name: 'Paranormal romance', category: 'Fiction', count: 0},
  {id: '18' ,name: 'Picture book', category: 'Fiction', count: 0},
  {id: '19' ,name: 'Poetry', category: 'Fiction', count: 0},
  {id: '20' ,name: 'Political thriller', category: 'Fiction', count: 0},
  {id: '21' ,name: 'Romance', category: 'Fiction', count: 0},
  {id: '22' ,name: 'Satire', category: 'Fiction', count: 0},
  {id: '23' ,name: 'Science fiction', category: 'Fiction', count: 0},
  {id: '24' ,name: 'Short story', category: 'Fiction', count: 0},
  {id: '25' ,name: 'Suspense', category: 'Fiction', count: 0},
  {id: '26' ,name: 'Thriller', category: 'Fiction', count: 0},
  {id: '27' ,name: 'Western', category: 'Fiction', count: 0},
  {id: '28' ,name: 'Young adult', category: 'Fiction', count: 0},
  {id: '29' ,name: 'Art/architecture', category: 'Non-fiction', count: 0},
  {id: '30' ,name: 'Autobiography', category: 'Non-fiction', count: 0},
  {id: '31' ,name: 'Biography', category: 'Non-fiction', count: 0},
  {id: '32' ,name: 'Business/economics', category: 'Non-fiction', count: 0},
  {id: '33' ,name: 'Crafts/hobbies', category: 'Non-fiction', count: 0},
  {id: '34' ,name: 'Cookbook', category: 'Non-fiction', count: 0},
  {id: '35' ,name: 'Diary', category: 'Non-fiction', count: 0},
  {id: '36' ,name: 'Dictionary', category: 'Non-fiction', count: 0},
  {id: '37' ,name: 'Encyclopedia', category: 'Non-fiction', count: 0},
  {id: '38' ,name: 'Guide', category: 'Non-fiction', count: 0},
  {id: '39' ,name: 'Health/fitness', category: 'Non-fiction', count: 0},
  {id: '40' ,name: 'History', category: 'Non-fiction', count: 0},
  {id: '41' ,name: 'Home and garden', category: 'Non-fiction', count: 0},
  {id: '42' ,name: 'Humor', category: 'Non-fiction', count: 0},
  {id: '43' ,name: 'Journal', category: 'Non-fiction', count: 0},
  {id: '44' ,name: 'Math', category: 'Non-fiction', count: 0},
  {id: '45' ,name: 'Memoir', category: 'Non-fiction', count: 0},
  {id: '46' ,name: 'Philosophy', category: 'Non-fiction', count: 0},
  {id: '47' ,name: 'Prayer', category: 'Non-fiction', count: 0},
  {id: '48' ,name: 'Religion, spirituality, and new age', category: 'Non-fiction', count: 0},
  {id: '49' ,name: 'Textbook', category: 'Non-fiction', count: 0},
  {id: '50' ,name: 'True crime', category: 'Non-fiction', count: 0},
  {id: '51' ,name: 'Review', category: 'Non-fiction', count: 0},
  {id: '52' ,name: 'Science', category: 'Non-fiction', count: 0},
  {id: '53' ,name: 'Self help', category: 'Non-fiction', count: 0},
  {id: '54' ,name: 'Sports and leisure', category: 'Non-fiction', count: 0},
  {id: '55' ,name: 'Travel', category: 'Non-fiction', count: 0},
  {id: '56' ,name: 'True crime', category: 'Non-fiction', count: 0}
 ];


function HomeScreen ({navigation}) {
  // Declare state variables for the last book read, the total pages read, and the average pages per book
  const [lastBook, setLastBook] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [averagePages, setAveragePages] = useState(0);

  // Define a function to load the data from async storage
  const loadData = async () => {
    try {
      // Get the books array from async storage
      const books = await AsyncStorage.getItem('books');
      // Parse the books array into a JavaScript object
      const booksObj = JSON.parse(books);
      // If the books array is not empty, get the last book read and update the state
      if (booksObj && booksObj.length > 0) {
        const lastBook = booksObj[booksObj.length - 1];
        setLastBook(lastBook);
      }
      // Get the total pages read from async storage
      const totalPages = await AsyncStorage.getItem('totalPages');
      // Parse the total pages read into a number and update the state
      const totalPagesNum = parseInt(totalPages);
      if (!isNaN(totalPagesNum)) {
        setTotalPages(totalPagesNum);
      }
      // Get the average pages per book from async storage
      const averagePages = await AsyncStorage.getItem('averagePages');
      // Parse the average pages per book into a number and update the state
      const averagePagesNum = parseFloat(averagePages);
      if (!isNaN(averagePagesNum)) {
        setAveragePages(averagePagesNum);
      }
    } catch (error) {
      // Handle any errors that may occur while reading from async storage
      console.error(error);
    }
  };

  // Use an effect hook to load the data when the component mounts or updates
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookWorm</Text>
      {lastBook ? (
        <View style={styles.bookContainer}>
          <Text style={styles.bookTitle}>Last Book Read:</Text>
          <Text style={styles.bookDetails}>Title: {lastBook.title}</Text>
          <Text style={styles.bookDetails}>Author: {lastBook.author}</Text>
          <Text style={styles.bookDetails}>Genre: {lastBook.genre}</Text>
          <Text style={styles.bookDetails}>Number of Pages: {lastBook.pages}</Text>
        </View>
      ) : (
        <Text style={styles.noBook}>You have not entered any books yet.</Text>
      )}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Statistics:</Text>
        <Text style={styles.statsDetails}>Total Pages Read: {totalPages}</Text>
        <Text style={styles.statsDetails}>Average Pages Per Book: {averagePages.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Enter New Book" onPress={() => navigation.navigate('Enter Book')} />
        <Button title=" History" onPress={() => navigation.navigate('History')} />
        <Button title=" Genre" onPress={() => navigation.navigate('Genre')} />
      </View>
    </View>
  );
};

function EnterBookScreen ({navigation}){
  // Declare state variables for the input fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState();
  const [pages, setPages] = useState('');

  // Define a function to save the book data to async storage
  const saveBook = async () => {
    try {
      // Validate the input fields and show an alert message if any of them are empty or invalid
      if (!title) {
        Alert.alert('Please enter a title');
        return;
      }
      if (!author) {
        Alert.alert('Please enter an author');
        return;
      }
      if (!genre) {
        Alert.alert('Please select a genre');
        return;
      }
      if (!pages || isNaN(pages) || pages <= 0) {
        Alert.alert('Please enter a valid number of pages');
        return;
      }

      // Create a book object with the input fields
      const book = {
        title,
        author,
        genre,
        pages,
      };

      // Get the books array from async storage
      const books = await AsyncStorage.getItem('books');
      // Parse the books array into a JavaScript object
      const booksObj = JSON.parse(books);
      // If the books array is not empty, append the new book to it and save it back to async storage
      if (booksObj && booksObj.length > 0) {
        booksObj.push(book);
        await AsyncStorage.setItem('books', JSON.stringify(booksObj));
      } else {
        // If the books array is empty, create a new array with the new book and save it to async storage
        await AsyncStorage.setItem('books', JSON.stringify([book]));
      }

      // Get the total pages read from async storage
      const totalPages = await AsyncStorage.getItem('totalPages');
      // Parse the total pages read into a number
      const totalPagesNum = parseInt(totalPages);
      // If the total pages read is not NaN, add the new book's pages to it and save it back to async storage
      if (!isNaN(totalPagesNum)) {
        await AsyncStorage.setItem(
          'totalPages',
          (totalPagesNum + parseInt(pages)).toString(),
        );
      } else {
        // If the total pages read is NaN, save the new book's pages as the total pages read to async storage
        await AsyncStorage.setItem('totalPages', pages);
      }

      // Get the average pages per book from async storage
      const averagePages = await AsyncStorage.getItem('averagePages');
      // Parse the average pages per book into a number
      const averagePagesNum = parseFloat(averagePages);
      // If the average pages per book is not NaN, calculate the new average by dividing the new total pages read by the new number of books and save it back to async storage
      if (!isNaN(averagePagesNum)) {
        await AsyncStorage.setItem(
          'averagePages',
          ((totalPagesNum + parseInt(pages)) / (booksObj.length + 1)).toString(),
        );
      } else {
        // If the average pages per book is NaN, save the new book's pages as the average pages per book to async storage
        await AsyncStorage.setItem('averagePages', pages);
      }

      // Show a success message and go back to the home screen
      Alert.alert('Book saved successfully');
      navigation.goBack();
    } catch (error) {
      // Handle any errors that may occur while writing to async storage
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter New Book</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title:</Text>
        <TextInput
          style={styles.inputField}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter the title of the book"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Author:</Text>
        <TextInput
          style={styles.inputField}
          value={author}
          onChangeText={setAuthor}
          placeholder="Enter the author of the book"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Genre:</Text>
        <Picker 
				style={styles.pickerField}
        selectedValue={genre}
				onValueChange={(item2Value, item2Index) =>  setGenre(item2Value) }
			>
        {genreList.map(genre => <Picker.Item key={genre.id} label={genre.name} value={genre.name}/>)}
			</Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Pages:</Text>
        <TextInput
          style={styles.inputField}
          value={pages}
          onChangeText={setPages}
          placeholder="Enter the number of pages in the book"
          keyboardType="numeric"
        />
      </View>
      <Button  title="Save Book" onPress={saveBook} />
    </View>
  );
};

// Create a stack navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Enter Book" component={EnterBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBC3E3',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
  },
  bookContainer: {
    borderWidth: 1,
    borderColor: '#E6E6FA',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#E6E6FA',
    width: '90%',
    
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  bookDetails: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
  },
  noBook: {
    fontSize: 18,
    color: '#000000',
    margin: 10,
  },
  statsContainer: {
    borderWidth: 3,
    borderColor: '#E6E6FA',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '90%',
  },
  statsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '000000',
    marginBottom: 5,
  },
  statsDetails: {
    fontSize: 24,
    color: '000000',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    margin: 10, 
    paddingTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  inputLabel: {
    fontSize: 20,
    color: '000000',
    width: '30%',
  },
  inputField: {
    fontSize: 20,
    color: '000000',
    borderWidth: 2,
    borderColor: '#E6E6FA',
    borderRadius: 10,
    padding: 5,
    width: '70%',
  },
  pickerField: {
    width: '70%',
    borderColor: '#E6E6FA'
  },
});

export default App;
