import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import '../../sass/stylesAddArticle.scss'
export default function AddArticleZIP({ auth }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        indexability: '',
        articleZIP: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('addArticleZIP'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Добавить сборник статей</h2>}
        >
            <Head title="Add article ZIP" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="formArticle formArticleZip bg-blue-300 overflow-hidden shadow-sm sm:rounded-lg">
                        <h1>Все файлы должны быть в формате .docx, названия файлов по шаблону: </h1>
                        <h1>НазваниеСтатьи_ФИО(полностью)_ФИОНаучногоРуководителя(Инициалы)_УДК. <br/>Пример: Сборка микроконтроллеров_Иванов Иван Иванович_Петров П.П._004.3</h1>
                        <form onSubmit={submit} encType="multipart/form-data">
                            <div>
                                <InputLabel htmlFor="title" value="Название сборника" />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="formTextInp mt-1 block w-full"
                                    placeholder="Введите полное название сборника"
                                    isFocused={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                />

                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="indexability" value="Индексируемость" />

                                <TextInput
                                    id="indexability"
                                    type="text"
                                    name="indexability"
                                    value={data.indexability}
                                    className="formTextInp mt-1 block w-full"
                                    placeholder="Введите индексируемость сборника"
                                    onChange={(e) => setData('indexability', e.target.value)}
                                />

                                <InputError message={errors.indexability} className="mt-2" />
                            </div>



                            <div className="mt-4">
                                <InputLabel htmlFor="articleZIP" value="Загрузите сборник в формате .zip" />

                                <TextInput
                                    id="articleZIP"
                                    type="file"
                                    name="articleZIP"
                                    className="formTextInp mt-1 block w-full"
                                    onChange={(e) => setData('articleZIP', e.target.files)}
                                />


                                <InputError message={errors.articleZIP} className="mt-2" />
                            </div>


                            <div className="flex items-center justify-end mt-4">

                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Загрузить сборник
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
