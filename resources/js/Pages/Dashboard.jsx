import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import '../../sass/stylesDashboard.scss';
export default function Dashboard({ auth, can }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Главная</h2>}
        >
            <Head title="Главная" />

            {/*{alert ("You're logged in!")}*/}

                            <div className="MenuBtn">
                                <h1>Вы на главной странице!</h1>
                                <a href={route('addArticle')} className="btnMenu btn btn-primary">Добавить статью</a>

                                <a href={route('myArticles')} className="btnMenu btn btn-primary">Список моих статей (находится в профиле)</a>

                                <a href={route('searchArticles')} className="btnMenu btn btn-primary">Поиск статей</a>

                                <a href={route('addFeedback')} className="btnMenu btn btn-primary">Заполнить форму обратной связи</a>

                                {
                                    can ? (<a className="btnMenu btn" href={route('adminPanel')}>Панель администратора</a>) : null
                                }
                            </div>



        </AuthenticatedLayout>
    );
}
