import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom"; // instead of BrowserRouter we use HashRouter
import './App.css';
import Header from './components/Headers';
import NotesListPage from './pages/NotesListPage';
import NotePage from  './pages/NotePage'

function App() {
  return (

    <Router>
      <div className="container dark">
        <div className="app">
        <Header />
          <Routes>
              <Route path="/" element={<NotesListPage />} />
              <Route path="/note/:id" element={<NotePage />} />
          </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
