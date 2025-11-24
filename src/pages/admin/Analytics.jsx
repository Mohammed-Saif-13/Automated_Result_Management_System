import { TrendingUp, Users, Award, BookOpen } from 'lucide-react';
import StatCard from '@/components/cards/StatCard';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import LineChart from '@/components/charts/LineChart';
import AreaChart from '@/components/charts/AreaChart';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import { useState } from 'react';

const mockAnalytics = {
    totalStudents: 156,
    averagePercentage: 76.5,
    topperPercentage: 95.8,
    totalSubjects: 8,

    subjectWisePerformance: [
        { subject: 'Math', average: 74.5 },
        { subject: 'Science', average: 78.2 },
        { subject: 'English', average: 82.5 },
        { subject: 'Hindi', average: 79.8 },
        { subject: 'Social', average: 76.3 },
    ],

    gradeDistribution: [
        { name: 'A+ (90-100)', value: 45 },
        { name: 'A (80-89)', value: 62 },
        { name: 'B (70-79)', value: 38 },
        { name: 'C (60-69)', value: 18 },
        { name: 'D (40-59)', value: 12 },
        { name: 'F (0-39)', value: 5 },
    ],

    classWisePerformance: [
        { class: 'Class 6', average: 72.5 },
        { class: 'Class 7', average: 74.2 },
        { class: 'Class 8', average: 76.8 },
        { class: 'Class 9', average: 78.5 },
        { class: 'Class 10', average: 80.2 },
    ],

    monthlyTrend: [
        { month: 'Jan', percentage: 75.2 },
        { month: 'Feb', percentage: 76.8 },
        { month: 'Mar', percentage: 78.5 },
        { month: 'Apr', percentage: 77.2 },
        { month: 'May', percentage: 79.5 },
        { month: 'Jun', percentage: 80.8 },
    ],

    passFailTrend: [
        { month: 'Jan', pass: 142, fail: 14 },
        { month: 'Feb', pass: 145, fail: 11 },
        { month: 'Mar', pass: 148, fail: 8 },
        { month: 'Apr', pass: 144, fail: 12 },
        { month: 'May', pass: 150, fail: 6 },
        { month: 'Jun', pass: 152, fail: 4 },
    ],
};

const Analytics = () => {
    const [selectedClass, setSelectedClass] = useState('all');
    const [selectedExam, setSelectedExam] = useState('all');

    const classOptions = [
        { value: 'all', label: 'All Classes' },
        { value: '6', label: 'Class 6' },
        { value: '7', label: 'Class 7' },
        { value: '8', label: 'Class 8' },
        { value: '9', label: 'Class 9' },
        { value: '10', label: 'Class 10' },
    ];

    const examOptions = [
        { value: 'all', label: 'All Exams' },
        { value: 'midterm', label: 'Mid Term' },
        { value: 'final', label: 'Final Term' },
        { value: 'quarterly', label: 'Quarterly' },
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Analytics & Insights
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                        Comprehensive performance analysis and trends
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        options={classOptions}
                        className="flex-1 sm:flex-initial sm:w-48"
                    />

                    <Select
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                        options={examOptions}
                        className="flex-1 sm:flex-initial sm:w-48"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Students"
                    value={mockAnalytics.totalStudents}
                    icon={Users}
                    color="primary"
                    trend="up"
                    trendValue="+12%"
                />

                <StatCard
                    title="Average Score"
                    value={`${mockAnalytics.averagePercentage}%`}
                    icon={TrendingUp}
                    color="success"
                    trend="up"
                    trendValue="+3.2%"
                />

                <StatCard
                    title="Highest Score"
                    value={`${mockAnalytics.topperPercentage}%`}
                    icon={Award}
                    color="warning"
                    trend="up"
                    trendValue="+1.5%"
                />

                <StatCard
                    title="Total Subjects"
                    value={mockAnalytics.totalSubjects}
                    icon={BookOpen}
                    color="primary"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <BarChart
                    title="Subject-wise Average Performance"
                    data={mockAnalytics.subjectWisePerformance}
                    xKey="subject"
                    yKey="average"
                    color="#3b82f6"
                />

                <BarChart
                    title="Class-wise Performance"
                    data={mockAnalytics.classWisePerformance}
                    xKey="class"
                    yKey="average"
                    color="#22c55e"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <PieChart
                    title="Grade Distribution"
                    data={mockAnalytics.gradeDistribution}
                    colors={['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']}
                />

                <Card>
                    <Card.Header>
                        <Card.Title>Performance Insights</Card.Title>
                    </Card.Header>

                    <Card.Content>
                        <div className="space-y-4">
                            <div className="p-3 sm:p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                                        <TrendingUp size={16} className="text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-success-900 dark:text-success-300">
                                            Excellent Progress
                                        </p>
                                        <p className="text-xs sm:text-sm text-success-700 dark:text-success-400 mt-1">
                                            English subject showing 12% improvement from last term
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-warning-500 rounded-full flex items-center justify-center">
                                        <BookOpen size={16} className="text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-warning-900 dark:text-warning-300">
                                            Needs Attention
                                        </p>
                                        <p className="text-xs sm:text-sm text-warning-700 dark:text-warning-400 mt-1">
                                            Mathematics average is 74.5% - lowest among all subjects
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                        <Award size={16} className="text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-primary-900 dark:text-primary-300">
                                            Top Performers
                                        </p>
                                        <p className="text-xs sm:text-sm text-primary-700 dark:text-primary-400 mt-1">
                                            45 students scored A+ grade (90% and above)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 bg-danger-50 dark:bg-danger-900/20 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-danger-500 rounded-full flex items-center justify-center">
                                        <Users size={16} className="text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-danger-900 dark:text-danger-300">
                                            At Risk Students
                                        </p>
                                        <p className="text-xs sm:text-sm text-danger-700 dark:text-danger-400 mt-1">
                                            5 students failed - immediate intervention required
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <AreaChart
                title="Monthly Performance Trend"
                data={mockAnalytics.monthlyTrend}
                xKey="month"
                yKey="percentage"
                color="#3b82f6"
            />

            <LineChart
                title="Pass/Fail Trend Analysis"
                data={mockAnalytics.passFailTrend}
                xKey="month"
                lines={[
                    { key: 'pass', name: 'Passed' },
                    { key: 'fail', name: 'Failed' },
                ]}
                colors={['#22c55e', '#ef4444']}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <p className="text-3xl sm:text-4xl font-bold text-primary-600">92.3%</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">Pass Rate</p>
                        <Badge variant="success" className="mt-2">+2.5%</Badge>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <p className="text-3xl sm:text-4xl font-bold text-success-600">85.2%</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">Attendance</p>
                        <Badge variant="success" className="mt-2">+1.8%</Badge>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <p className="text-3xl sm:text-4xl font-bold text-warning-600">45</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">A+ Students</p>
                        <Badge variant="warning" className="mt-2">+8</Badge>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="text-center py-4 sm:py-6">
                        <p className="text-3xl sm:text-4xl font-bold text-danger-600">5</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">Failed</p>
                        <Badge variant="danger" className="mt-2">-3</Badge>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;