import { Users, FileText, TrendingUp, Award } from 'lucide-react';
import StatCard from '@/components/cards/StatCard';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import LineChart from '@/components/charts/LineChart';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { mockAnalytics, mockHistory } from '@/data/mockData';
import { formatDateTime } from '@/utils/helpers';

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back! Here's what's happening with your school today.
                </p>
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
                    title="Total Results"
                    value={mockAnalytics.totalResults}
                    icon={FileText}
                    color="success"
                    trend="up"
                    trendValue="+8%"
                />

                <StatCard
                    title="Average Score"
                    value={`${mockAnalytics.averagePercentage}%`}
                    icon={TrendingUp}
                    color="warning"
                    trend="up"
                    trendValue="+3.2%"
                />

                <StatCard
                    title="Pass Rate"
                    value={`${mockAnalytics.passPercentage}%`}
                    icon={Award}
                    color="success"
                    trend="up"
                    trendValue="+2.5%"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <BarChart
                    title="Subject-wise Performance"
                    data={mockAnalytics.subjectWisePerformance}
                    xKey="subject"
                    yKey="average"
                    color="#3b82f6"
                />

                <PieChart
                    title="Grade Distribution"
                    data={mockAnalytics.gradeDistribution}
                    colors={['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2">
                    <LineChart
                        title="Monthly Performance Trend"
                        data={mockAnalytics.monthlyTrend}
                        xKey="month"
                        lines={[{ key: 'percentage', name: 'Average Percentage' }]}
                        colors={['#3b82f6']}
                    />
                </div>

                <Card>
                    <Card.Header>
                        <Card.Title>Top Performers</Card.Title>
                    </Card.Header>

                    <Card.Content>
                        <div className="space-y-4">
                            {mockAnalytics.topPerformers.map((student, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-bold text-primary-600">
                                            {index + 1}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {student.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {student.rollNumber} • {student.class}
                                        </p>
                                    </div>

                                    <Badge variant="success">{student.percentage}%</Badge>
                                </div>
                            ))}
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <Card>
                <Card.Header>
                    <Card.Title>Recent Activities</Card.Title>
                </Card.Header>

                <Card.Content>
                    <div className="space-y-4">
                        {mockHistory.slice(0, 5).map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                                <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${activity.status === 'success' ? 'bg-success-500' : 'bg-danger-500'
                                    }`}></div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {activity.action}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {activity.description}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        {formatDateTime(activity.timestamp)} • by {activity.user}
                                    </p>
                                </div>

                                <Badge variant={activity.status === 'success' ? 'success' : 'danger'}>
                                    {activity.recordsAffected} records
                                </Badge>
                            </div>
                        ))}
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
};

export default AdminDashboard;