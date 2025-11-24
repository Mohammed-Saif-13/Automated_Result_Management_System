import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import AreaChart from '@/components/charts/AreaChart';
import PerformanceCard from '@/components/cards/PerformanceCard';

const mockPerformanceData = {
    overallProgress: {
        currentAverage: 83.8,
        previousAverage: 81.5,
        improvement: 2.3,
    },

    subjectPerformance: [
        { subject: 'Mathematics', marks: 85, totalMarks: 100, rank: 8 },
        { subject: 'Science', marks: 78, totalMarks: 100, rank: 12 },
        { subject: 'English', marks: 92, totalMarks: 100, rank: 3 },
        { subject: 'Hindi', marks: 88, totalMarks: 100, rank: 5 },
        { subject: 'Social Science', marks: 76, totalMarks: 100, rank: 15 },
    ],

    progressTrend: [
        { exam: 'Q1', percentage: 78.5 },
        { exam: 'Q2', percentage: 80.2 },
        { exam: 'Mid', percentage: 81.5 },
        { exam: 'Q3', percentage: 82.8 },
        { exam: 'Final', percentage: 83.8 },
    ],

    subjectTrend: [
        { exam: 'Q1', Math: 75, Science: 72, English: 85 },
        { exam: 'Q2', Math: 78, Science: 74, English: 88 },
        { exam: 'Mid', Math: 80, Science: 76, English: 90 },
        { exam: 'Q3', Math: 82, Science: 77, English: 91 },
        { exam: 'Final', Math: 85, Science: 78, English: 92 },
    ],

    strengths: ['English', 'Hindi', 'Mathematics'],
    weaknesses: ['Social Science', 'Science'],

    comparisons: [
        { metric: 'Class Average', value: 76.5, yours: 83.8 },
        { metric: 'Section Average', value: 78.2, yours: 83.8 },
        { metric: 'School Average', value: 74.8, yours: 83.8 },
    ],
};

const Performance = () => {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Performance Analysis
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Track your progress and identify improvement areas
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="text-success-600" size={32} />
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                            {mockPerformanceData.overallProgress.currentAverage}%
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Current Average
                        </p>
                        <Badge variant="success" className="mt-2">
                            +{mockPerformanceData.overallProgress.improvement}%
                        </Badge>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <Award className="text-warning-600" size={32} />
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">#5</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Class Rank</p>
                        <Badge variant="success" className="mt-2">+2 positions</Badge>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <Target className="text-primary-600" size={32} />
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">3/5</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Above 80%
                        </p>
                        <Badge variant="primary" className="mt-2">Strong</Badge>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="text-success-600" size={32} />
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                            +7.3%
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Improvement
                        </p>
                        <Badge variant="success" className="mt-2">Since Q1</Badge>
                    </Card.Content>
                </Card>
            </div>

            <Card>
                <Card.Header>
                    <Card.Title>Subject-wise Performance</Card.Title>
                </Card.Header>

                <Card.Content>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {mockPerformanceData.subjectPerformance.map((subject, index) => (
                            <PerformanceCard key={index} {...subject} />
                        ))}
                    </div>
                </Card.Content>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <AreaChart
                    title="Overall Progress Trend"
                    data={mockPerformanceData.progressTrend}
                    xKey="exam"
                    yKey="percentage"
                    color="#3b82f6"
                />

                <Card>
                    <Card.Header>
                        <Card.Title>Strengths & Weaknesses</Card.Title>
                    </Card.Header>

                    <Card.Content>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Strong Subjects
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {mockPerformanceData.strengths.map((subject, index) => (
                                        <Badge key={index} variant="success" className="flex items-center gap-1">
                                            <TrendingUp size={14} />
                                            {subject}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Needs Improvement
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {mockPerformanceData.weaknesses.map((subject, index) => (
                                        <Badge key={index} variant="warning" className="flex items-center gap-1">
                                            <TrendingDown size={14} />
                                            {subject}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Comparison with Averages
                                </h4>
                                <div className="space-y-3">
                                    {mockPerformanceData.comparisons.map((comp, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {comp.metric}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">{comp.value}%</span>
                                                <span className="text-sm font-semibold text-success-600">
                                                    You: {comp.yours}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <LineChart
                title="Subject-wise Progress Trend"
                data={mockPerformanceData.subjectTrend}
                xKey="exam"
                lines={[
                    { key: 'Math', name: 'Mathematics' },
                    { key: 'Science', name: 'Science' },
                    { key: 'English', name: 'English' },
                ]}
                colors={['#3b82f6', '#22c55e', '#f59e0b']}
            />

            <Card>
                <Card.Header>
                    <Card.Title>Recommendations</Card.Title>
                </Card.Header>

                <Card.Content>
                    <div className="space-y-3">
                        <div className="p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                            <p className="text-sm font-medium text-primary-900 dark:text-primary-300">
                                💡 Focus on Social Science
                            </p>
                            <p className="text-xs sm:text-sm text-primary-700 dark:text-primary-400 mt-1">
                                Your score is 76% - aim for 80%+ to improve overall average
                            </p>
                        </div>

                        <div className="p-3 sm:p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                            <p className="text-sm font-medium text-success-900 dark:text-success-300">
                                ✅ Maintain English Performance
                            </p>
                            <p className="text-xs sm:text-sm text-success-700 dark:text-success-400 mt-1">
                                Excellent work! Keep up the consistency in English (92%)
                            </p>
                        </div>

                        <div className="p-3 sm:p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                            <p className="text-sm font-medium text-warning-900 dark:text-warning-300">
                                📚 Practice More Science
                            </p>
                            <p className="text-xs sm:text-sm text-warning-700 dark:text-warning-400 mt-1">
                                Slight improvement from 76% to 78% - more practice needed
                            </p>
                        </div>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
};

export default Performance;