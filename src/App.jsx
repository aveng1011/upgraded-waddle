import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Project from './pages/Project.jsx';
import NotFound from './pages/NotFound.jsx';
import { ContentProvider } from './content/ContentContext.jsx';

export default function App() {
  return (
    <ContentProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContentProvider>
  );
}
