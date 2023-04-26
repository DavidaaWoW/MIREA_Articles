import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import '../../sass/stylesAddFeedback.scss'
export default function AddFeedback({ auth }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        message: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('addFeedback'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Оставить обратную связь</h2>}
        >
            <Head title="Обратная связь" />


            <div className="container">
                <div className="content">
                    <div className="left-side">
                        <div className="address details">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="topic">Адрес</div>
                            <div className="text-one">г. Москва</div>
                            <div className="text-two">Проспект Вернадского., 78 стр. 1</div>
                        </div>
                        <div className="phone details">
                            <i className="fas fa-phone-alt"></i>
                            <div className="topic">Телефон</div>
                            <div className="text-one">8-800-000-00-00</div>
                            <div className="text-two">8-900-000-00-00</div>
                        </div>
                        <div className="email details">
                            <i className="fas fa-envelope"></i>
                            <div className="topic">Email</div>
                            <div className="text-one">support@site.com</div>
                            <div className="text-two">admin@site.com</div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="topic-text">Отправьте нам сообщение</div>
                        <p>
                            Если у вас есть какие-то вопросы или предложения по сотрудничеству -
                            заполните форму ниже
                        </p>
                        <form action="#">
                            <div className="input-box">
                                <input type="text" placeholder="Ваше имя"/>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Введите email"/>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Введите телефон"/>
                            </div>
                            <div className="input-box message-box">
                                <textarea placeholder="Сообщение"></textarea>
                            </div>
                            <div className="button">
                                <input type="button" value="Отправить"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <script
                src="https://kit.fontawesome.com/fce9a50d02.js"
                crossOrigin="anonymous"
            ></script>





            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} encType="multipart/form-data">
                            <div>
                                <InputLabel htmlFor="message" value="Сообщение" />
                                <textarea id="message" name="message" onChange={(e) => setData('message', e.target.value)}></textarea>

                                <InputError message={errors.message} className="mt-2" />
                            </div>


                            <div className="flex items-center justify-end mt-4">

                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Отправить
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
