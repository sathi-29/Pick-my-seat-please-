const { useState, useEffect } = React;

const App = () => {
    const [currentPage, setCurrentPage] = useState('Home');
    const [selectedCollegeId, setSelectedCollegeId] = useState(1);
    const [selectedExamId, setSelectedExamId] = useState(1);
    const [selectedCourseId, setSelectedCourseId] = useState(1);
    const [selectedTuitionId, setSelectedTuitionId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        // Scroll to top on page change
        window.scrollTo(0, 0);
        setIsLoading(true);
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        
        return () => clearTimeout(timer);
    }, [currentPage]);
    
    const renderPage = () => {
        if (isLoading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            );
        }
        
        switch(currentPage) {
            case 'Home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'Colleges':
                return <CollegesPage setCurrentPage={setCurrentPage} setSelectedCollegeId={setSelectedCollegeId} />;
            case 'Scholarships': // NEW: Scholarships page
                return <ScholarshipsPage setCurrentPage={setCurrentPage} />;
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
        <div className="relative">
            {currentPage !== 'Login' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            <div className={currentPage !== 'Login' ? "pt-28" : ""}>
                {renderPage()}
            </div>
            {currentPage !== 'Login' && <Footer setCurrentPage={setCurrentPage} />}
        </div>
    );
};

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}