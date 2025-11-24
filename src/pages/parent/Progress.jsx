import { TrendingUp, Award, BookOpen, Calendar } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import AreaChart from '@/components/charts/AreaChart';

const mockProgressData = {
    overallTrend: [
        { exam: 'Q1 2023', percentage: 78.5 },
        { exam: 'Q2 2023', percentage: 80.2 },
        { exam: 'Mid 2023', percentage: 81.5 },
        { exam: 'Q3 2023', percentage: 82.8 },
        { exam: 'Final 2023', percentage: 83.8 },
    ],

    subjectComparison: [
        { subject: 'Math', previous: 82, current: 85 },
        { subject: 'Science', previous: 75, current: 78 },
        { subject: 'English', previous: 88, current: 92 },
        { subject: 'Hindi', previous: 85, current: 88 },
        { subject: 'Social', previous: 72, current: 76 },
    ],

    subjectTrend: [
        { month: 'Jan', Math: 75, Science: 72, English: 85 },
        { month: 'Feb', Math: 78, Science: 74, English: 88 },
        { month: 'Mar', Math: 80, Science: 76, English: 90 },
        { month: 'Apr', Math: 82, Science: 77, English: 91 },
        { month: 'May', Math: 85, Science: 78, English: 92 },
    ],

    milestones: [
        {
            title: 'Achieved A+ Grade',
            description: 'Scored 92% in English',
            date: '2024-01-15',
            type: 'achievement',
        },
        {
            title: 'Rank Improved',
            description: 'Moved from #7 to #5 in class',
            date: '2024-01-15',
            type: 'achievement',
        },
        {
            title: 'Good Progress',
            description: 'Mathematics improved by 3%',
            date: '2024-01-15',
            type: 'progress',
        },
        {
            title: 'Perfect Attendance',
            description: 'Full attendance in December',
            date: '2023-12-31',
            type: 'achievement',
        },
    ],

    statistics: {
        totalImprovement: '+5.3%',
        bestSubject: 'English (92%)',
        mostImproved: 'Mathematics (+3%)',
        currentRank: '#5',
    },
};

const Progress = () => {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Progress Tracker
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Monitor your child's academic journey
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="text-success-600" size={32} />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            {mockProgressData.statistics.totalImprovement}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Overall Improvement
                        </p>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <Award className="text-warning-600" size={32} />
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {mockProgressData.statistics.bestSubject}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Best Subject
                        </p>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <BookOpen className="text-primary-600" size={32} />
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {mockProgressData.statistics.mostImproved}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Most Improved
                        </p>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <Award className="text-success-600" size={32} />
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                            {mockProgressData.statistics.currentRank}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Class Rank
                        </p>
                    </Card.Content>
                </Card>
            </div>

            <AreaChart
                title="Overall Performance Trend"
                data={mockProgressData.overallTrend}
                xKey="exam"
                yKey="percentage"
                color="#3b82f6"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <BarChart
                    title="Subject-wise Comparison (Previous vs Current)"
                    data={mockProgressData.subjectComparison.map((item) => ({
                        subject: item.subject,
                        Previous: item.previous,
                        Current: item.current,
                    }))}
                    xKey="subject"
                    yKey="Current"
                    color="#22c55e"
                />

                <Card>
                    <Card.Header>
                        <Card.Title>Recent Milestones</Card.Title>
                    </Card.Header>

                    <Card.Content>
                        <div className="space-y-3">
                            {mockProgressData.milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                                >
                                    <div
                                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${milestone.type === 'achievement'
                                                ? 'bg-success-100 dark:bg-success-900/20'
                                                : 'bg-primary-100 dark:bg-primary-900/20'
                                            }`}
                                    >
                                        {milestone.type === 'achievement' ? (
                                            <Award
                                                size={20}
                                                className={
                                                    milestone.type === 'achievement'
                                                        ? 'text-success-600'
                                                        : 'text-primary-600'
                                                }
                                            />
                                        ) : (
                                            <TrendingUp size={20} className="text-primary-600" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {milestone.title}
                                            </h4>
                                            <Badge
                                                variant={
                                                    milestone.type === 'achievement' ? 'success' : 'primary'
                                                }
                                                size="sm"
                                            >
                                                New
                                            </Badge>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            {milestone.description}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                                            <Calendar size={12} />
                                            <span>{milestone.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <LineChart
                title="Subject-wise Monthly Progress"
                data={mockProgressData.subjectTrend}
                xKey="month"
                lines={[
                    { key: 'Math', name: 'Mathematics' },
                    { key: 'Science', name: 'Science' },
                    { key: 'English', name: 'English' },
                ]}
                colors={['#3b82f6', '#22c55e', '#f59e0b']}
            />

            <Card>
                <Card.Header>
                    <Card.Title>Performance Summary</Card.Title>
                </Card.Header>

                <Card.Content>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">Strengths</h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-success-50 dark:bg-success-900/20 rounded">
                                    <span className="text-sm text-success-900 dark:text-success-300">
                                        English
                                    </span>
                                    <Badge variant="success">92%</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-success-50 dark:bg-success-900/20 rounded">
                                    <span className="text-sm text-success-900 dark:text-success-300">
                                        Hindi
                                    </span>
                                    <Badge variant="success">88%</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-success-50 dark:bg-success-900/20 rounded">
                                    <span className="text-sm text-success-900 dark:text-success-300">
                                        Mathematics
                                    </span>
                                    <Badge variant="success">85%</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                Focus Areas
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-warning-50 dark:bg-warning-900/20 rounded">
                                    <span className="text-sm text-warning-900 dark:text-warning-300">
                                        Social Science
                                    </span>
                                    <Badge variant="warning">76%</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-warning-50 dark:bg-warning-900/20 rounded">
                                    <span className="text-sm text-warning-900 dark:text-warning-300">
                                        Science
                                    </span>
                                    <Badge variant="warning">78%</Badge>
                                </div>
                            </div>

                            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg mt-4">
                                <p className="text-sm font-medium text-primary-900 dark:text-primary-300">
                                    💡 Recommendation
                                </p>
                                <p className="text-xs text-primary-700 dark:text-primary-400 mt-1">
                                    Encourage more practice in Social Science and Science to reach 80%+ goal
                                </p>
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
};

export default Progress;