import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import '../../sass/stylesProfile.scss'
export default function Search({auth, articles = [], info = ''}) {
    const user = usePage().props.auth.user;
    const {data, setData, post, processing, errors, reset} = useForm({
        search: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('searchArticles'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Поиск статей</h2>}
        >
            <Head title="Search articles"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="Form bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="search" value="Поиск"/>

                                <TextInput
                                    id="search"
                                    type="text"
                                    name="search"
                                    value={data.search}
                                    className="formTextInp mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('search', e.target.value)}
                                />

                                <InputError message={errors.search} className="mt-2"/>
                            </div>

                            <div className="flex items-center justify-end mt-4">

                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Поиск
                                </PrimaryButton>
                            </div>
                        </form>
                        <h1>{info}</h1>
                        {
                            articles.map((article) => {
                                console.log(article)
                                return (
                                    <div>
                                    <a href={route('singleArticle', article.id)}>{article.title} </a>
                                    <br />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
