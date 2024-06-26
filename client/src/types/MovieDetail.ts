// {
//   "Title": "Harry Potter and the Deathly Hallows: Part 2",
//   "Year": "2011",
//   "Rated": "PG-13",
//   "Released": "15 Jul 2011",
//   "Runtime": "130 min",
//   "Genre": "Adventure, Family, Fantasy",
//   "Director": "David Yates",
//   "Writer": "Steve Kloves, J.K. Rowling",
//   "Actors": "Daniel Radcliffe, Emma Watson, Rupert Grint",
//   "Plot": "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
//   "Language": "English, Latin",
//   "Country": "United Kingdom, United States",
//   "Awards": "Nominated for 3 Oscars. 48 wins & 95 nominations total",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
//   "Ratings": [
//     {
//       "Source": "Internet Movie Database",
//       "Value": "8.1/10"
//     },
//     {
//       "Source": "Rotten Tomatoes",
//       "Value": "96%"
//     },
//     {
//       "Source": "Metacritic",
//       "Value": "85/100"
//     }
//   ],
//   "Metascore": "85",
//   "imdbRating": "8.1",
//   "imdbVotes": "947,886",
//   "imdbID": "tt1201607",
//   "Type": "movie",
//   "DVD": "N/A",
//   "BoxOffice": "$381,447,587",
//   "Production": "N/A",
//   "Website": "N/A",
//   "Response": "True"
// }
interface Rating {
    Source: string,
    Value: string,
}

interface MovieDetail {
    Title : string ,
    Year : string ,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string
    Ratings: Rating[]
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID : string ,
    Type : string ,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: string,
}

export default MovieDetail;