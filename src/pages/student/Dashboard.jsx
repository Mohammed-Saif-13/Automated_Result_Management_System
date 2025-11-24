import { Award, FileText, TrendingUp, Calendar } from 'lucide-react';
import StatCard from '@/components/cards/StatCard';
import ResultCard from '@/components/cards/ResultCard';
import PerformanceCard from '@/components/cards/PerformanceCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

const mockStudentData = {
    totalExams: 12,
    averagePercentage: 83.8,
    currentRank: 5,
    totalSubjects: 5,

    recentResults: [
        {
            id: 1,
            examName: 'Mid Term Exam 2024',
            date: '2024-01-15',
            obtainedMarks: 419,
            totalMarks: 500,
        },
        {
            id: 2,
            examName: 'Final Term Exam 2023',
            date: '2023-12-10',
            obtainedMarks: 410,
            totalMarks: 500,
        },
    ],

    subjectPerformance: [
        { subject: 'Mathematics', marks: 85, totalMarks: 100, rank: 8 },
        { subject: 'Science', marks: 78, totalMarks: 100, rank: 12 },
        { subject: 'English', marks: 92, totalMarks: 100, rank: 3 },
        { subject: 'Hindi', marks: 88, totalMarks: 100, rank: 5 },
        { subject: 'Social Science', marks: 76, totalMarks: 100, rank: 15 },
    ],

    upcomingExams: [
        { name: 'Quarterly Exam', date: '2024-02-15', subjects: 5 },
        { name: 'Unit Test', date: '2024-02-05', subjects: 2 },
    ],
};

const StudentDashboard = () => {
    const { user } = useAuth();
    const toast = useToast();

    const handleDownload = (result) => {
        toast.info('PDF download feature - Coming soon!');
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user?.name || 'Student'}!
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Here's your academic performance overview
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Exams"
                    value={mockStudentData.totalExams}
                    icon={FileText}
                    color="primary"
                />

                <StatCard
                    title="Average Score"
                    value={`${mockStudentData.averagePercentage}%`}
                    icon={TrendingUp}
                    color="success"
                    trend="up"
                    trendValue="+2.3%"
                />

                <StatCard
                    title="Class Rank"
                    value={`#${mockStudentData.currentRank}`}
                    icon={Award}
                    color="warning"
                    trend="up"
                    trendValue="+2"
                />

                <StatCard
                    title="Subjects"
                    value={mockStudentData.totalSubjects}
                    icon={Calendar}
                    color="primary"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <Card.Header>
                            <Card.Title>Recent Results</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <div className="space-y-3">
                                {mockStudentData.recentResults.map((result) => (
                                    <ResultCard
                                        key={result.id}
                                        result={result}
                                        onDownload={handleDownload}
                                    />
                                ))}
                            </div>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Header>
                            <Card.Title>Subject-wise Performance</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {mockStudentData.subjectPerformance.map((subject, index) => (
                                    <PerformanceCard key={index} {...subject} />
                                ))}
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card>
                        <Card.Header>
                            <Card.Title>Upcoming Exams</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <div className="space-y-3">
                                {mockStudentData.upcomingExams.map((exam, index) => (
                                    <div
                                        key={index}
                                        className="p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
                                    >
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {exam.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar size={14} />
                                            <span>{exam.date}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            {exam.subjects} subjects
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Header>
                            <Card.Title>Quick Stats</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Best Subject</span>
                                    <Badge variant="success">English - 92%</Badge>
                                </div>

                                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Needs Focus</span>
                                    <Badge variant="warning">Social - 76%</Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Attendance</span>
                                    <Badge variant="success">95%</Badge>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;