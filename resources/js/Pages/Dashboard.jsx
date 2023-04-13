import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <a href={route('addArticle')} className="btn btn-primary">Добавить статью</a>
                        <br/>
                        <a href={route('myArticles')} className="btn btn-primary">Список моих статей (находится в профиле)</a>
                        <br/>
                        <a href={route('searchArticles')} className="btn btn-primary">Поиск статей</a>
                        <br/>
                        <a href={route('addFeedback')} className="btn btn-primary">Заполнить форму обратной связи</a>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
