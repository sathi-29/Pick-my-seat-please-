const { useState, useEffect } = React;

const App = () => {
    const [currentPage, setCurrentPage] = useState('Home');
    const [selectedCollegeId, setSelectedCollegeId] = useState(1);
    const [selectedExamId, setSelectedExamId] = useState(1);
    const [selectedCourseId, setSelectedCourseId] = useState(1);
    const [selectedTuitionId, setSelectedTuitionId] = useState(1);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);
    
    const renderPage = () => {
        switch(currentPage) {
            case 'Home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'Colleges':
                return <CollegesPage setCurrentPage={setCurrentPage} setSelectedCollegeId={setSelectedCollegeId} />;
            case 'CollegeDetails':
                return <CollegeDetailsPage setCurrentPage={setCurrentPage} collegeId={selectedCollegeId} />;
            case 'Exams':
                return <ExamsPage setCurrentPage={setCurrentPage} setSelectedExamId={setSelectedExamId} />;
            case 'ExamDetails':
                return <ExamDetailsPage setCurrentPage={setCurrentPage} examId={selectedExamId} />;
            case 'Courses':
                return <CoursesPage setCurrentPage={setCurrentPage} setSelectedCourseId={setSelectedCourseId} />;
            case 'CourseDetails':
                return <CourseDetailsPage setCurrentPage={setCurrentPage} courseId={selectedCourseId} />;
            case 'Predictor':
                return <PredictorPage setCurrentPage={setCurrentPage} />;
            case 'Tuition':
                return <TuitionPage setCurrentPage={setCurrentPage} setSelectedTuitionId={setSelectedTuitionId} />;
            case 'TuitionDetails':
                return <TuitionDetailsPage setCurrentPage={setCurrentPage} tuitionId={selectedTuitionId} />;
            case 'Articles':
                return <ArticlesPage setCurrentPage={setCurrentPage} />;
            case 'Login':
                return <LoginPage setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };
    
    return (
        <div>
            {currentPage !== 'Login' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            {renderPage()}
            {currentPage !== 'Login' && <Footer setCurrentPage={setCurrentPage} />}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);