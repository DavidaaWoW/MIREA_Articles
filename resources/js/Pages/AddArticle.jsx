import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import '../../sass/stylesAddArticle.scss';


export default function AddArticle({ auth }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        indexability: '',
        udc: '',
        scientific_adviser: '',
        publication_place: '',
        article: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('addArticle'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Добавить статью</h2>}
        >
            <Head title="Добавить статью" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="formArticle bg-blue-300 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} encType="multipart/form-data">
                            <div>
                                <InputLabel htmlFor="title" value="Название" />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="formTextInp mt-1 block w-full"
                                    placeholder="Введите полное название статьи"
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
                                    placeholder="Введите индексируемость статьи"
                                    onChange={(e) => setData('indexability', e.target.value)}
                                />

                                <InputError message={errors.indexability} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="udc" value="УДК" />

                                <TextInput
                                    id="udc"
                                    type="text"
                                    name="udc"
                                    value={data.udc}
                                    className="formTextInp mt-1 block w-full"
                                    placeholder="Введите УДК статьи"
                                    onChange={(e) => setData('udc', e.target.value)}
                                />

                                <InputError message={errors.udc} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="scientific_adviser" value="Научный руководитель" />

                                <TextInput
                                    id="scientific_adviser"
                                    type="text"
                                    name="scientific_adviser"
                                    value={data.scientific_adviser}
                                    className="formTextInp mt-1 block w-full"
                                    placeholder="Введите ФИО научного руководителя (при наличии)"
                                    onChange={(e) => setData('scientific_adviser', e.target.value)}
                                />

                                <InputError message={errors.scientific_adviser} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="publication_place" value="Место публикации" />

                                <TextInput
                                    id="publication_place"
                                    type="text"
                                    name="publication_place"
                                    value={data.publication_place}
                                    className="formTextInp mt-1 block w-full"
                                    placeholder="Введите место публикации (сборник статей, научный журнал и т.д.)"
                                    onChange={(e) => setData('publication_place', e.target.value)}
                                />

                                <InputError message={errors.publication_place} className="mt-2" />
                            </div>

                            {/*<InputLabel htmlFor="article" value="Загрузите файл статьи в формате .docx" />*/}
                            {/*<div className="input__wrapper">*/}
                            {/*    <input name="file" type="file" id="input__file" className="input input__file" multiple/>*/}
                            {/*        <label htmlFor="input__file" className="input__file-button" >*/}
                            {/*            <span className="input__file-icon-wrapper">*/}
                            {/*                <img*/}
                            {/*                className="input__file-icon"*/}
                            {/*                src="https://cdn.icon-icons.com/icons2/1812/PNG/512/4213410-arrow-down-download-move-save_115410.png"*/}

                            {/*                width="25"/>*/}

                            {/*            </span>*/}
                            {/*            <span className="input__file-button-text">Выберите файл</span>*/}
                            {/*        </label>*/}
                            {/*</div>*/}

                            <div className="mt-4">
                                <InputLabel htmlFor="article" value="Загрузите файл статьи в формате .docx" />

                                <TextInput
                                    id="article"
                                    type="file"
                                    name="article"
                                    className="formTextInp mt-1 block w-full"
                                    onChange={(e) => setData('article', e.target.files)}
                                />


                                <InputError message={errors.article} className="formTextInp mt-2" />
                            </div>


                            <div className="flex items-center justify-end mt-4">

                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Отправить статью на проверку
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
