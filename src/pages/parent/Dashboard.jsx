import { User, Award, TrendingUp, BookOpen } from 'lucide-react';
import StatCard from '@/components/cards/StatCard';
import ResultCard from '@/components/cards/ResultCard';
import PerformanceCard from '@/components/cards/PerformanceCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useToast } from '@/hooks/useToast';

const mockChildData = {
    name: 'Rahul Sharma',
    rollNumber: 'STD001',
    class: '10',
    section: 'A',

    stats: {
        totalExams: 12,
        averagePercentage: 83.8,
        classRank: 5,
        attendance: 95,
    },

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
    ],

    teacherRemarks: [
        {
            subject: 'Mathematics',
            teacher: 'Mr. Sharma',
            remark: 'Excellent problem-solving skills. Keep practicing!',
            date: '2024-01-15',
        },
        {
            subject: 'English',
            teacher: 'Mrs. Gupta',
            remark: 'Outstanding performance. Very creative writing.',
            date: '2024-01-15',
        },
    ],
};

const ParentDashboard = () => {
    const toast = useToast();

    const handleDownload = (result) => {
        toast.info('PDF download - Coming soon!');
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome, Parent!
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Track your child's academic progress
                </p>
            </div>

            <Card className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-primary-600 rounded-full flex items-center justify-center">
                        <User size={32} className="text-white" />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {mockChildData.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                            <Badge variant="primary">
                                Roll No: {mockChildData.rollNumber}
                            </Badge>
                            <Badge variant="primary">
                                Class {mockChildData.class}-{mockChildData.section}
                            </Badge>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Exams"
                    value={mockChildData.stats.totalExams}
                    icon={BookOpen}
                    color="primary"
                />

                <StatCard
                    title="Average Score"
                    value={`${mockChildData.stats.averagePercentage}%`}
                    icon={TrendingUp}
                    color="success"
                    trend="up"
                    trendValue="+2.3%"
                />

                <StatCard
                    title="Class Rank"
                    value={`#${mockChildData.stats.classRank}`}
                    icon={Award}
                    color="warning"
                    trend="up"
                    trendValue="+2"
                />

                <StatCard
                    title="Attendance"
                    value={`${mockChildData.stats.attendance}%`}
                    icon={User}
                    color="success"
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
                                {mockChildData.recentResults.map((result) => (
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
                            <Card.Title>Subject Performance</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {mockChildData.subjectPerformance.map((subject, index) => (
                                    <PerformanceCard key={index} {...subject} />
                                ))}
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card>
                        <Card.Header>
                            <Card.Title>Teacher Remarks</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <div className="space-y-3">
                                {mockChildData.teacherRemarks.map((remark, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {remark.subject}
                                            </h4>
                                            <Badge variant="primary" size="sm">
                                                New
                                            </Badge>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            {remark.remark}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            - {remark.teacher}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Header>
                            <Card.Title>Quick Insights</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <div className="space-y-3">
                                <div className="p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                                    <p className="text-sm font-medium text-success-900 dark:text-success-300">
                                        ✅ Strong Performance
                                    </p>
                                    <p className="text-xs text-success-700 dark:text-success-400 mt-1">
                                        Excelling in English with 92%
                                    </p>
                                </div>

                                <div className="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                                    <p className="text-sm font-medium text-warning-900 dark:text-warning-300">
                                        📚 Needs Attention
                                    </p>
                                    <p className="text-xs text-warning-700 dark:text-warning-400 mt-1">
                                        Science needs more focus (78%)
                                    </p>
                                </div>

                                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                                    <p className="text-sm font-medium text-primary-900 dark:text-primary-300">
                                        📈 Good Progress
                                    </p>
                                    <p className="text-xs text-primary-700 dark:text-primary-400 mt-1">
                                        +2.3% improvement overall
                                    </p>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;