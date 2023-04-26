import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import { router } from '@inertiajs/react'

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import '../../../sass/stylesMyArticles.scss'
export default function MyArticles({ auth, articles }) {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Мои статьи</h2>}
        >
            <Head title="My Articles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="cards overflow-hidden shadow-sm sm:rounded-lg">
                        {
                            articles.map((article) => {
                              return (
                                  <div className={"articleList"}>

                                          <div className="card">
                                              <h1>Название: {article.title}</h1>
                                              <p>УДК: {article.udc}</p>
                                              <p>Индексируемость: {article.indexability}</p>
                                              <p>Место публицации:{article.publication_place}</p>
                                              <p>Статус верификации: {article.verification_status}</p>
                                              <p>
                                                  <button><a href={route('download', article.id)}>Скачать файл</a></button>
                                              </p>
                                          </div>




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
