import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {router} from '@inertiajs/react'

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";
import DangerButton from "@/Components/DangerButton";
import '../../sass/stylesFeedback.scss'
export default function FeedbackList({auth, feedback}) {
    const user = usePage().props.auth.user;
    const {data, setData, post, processing, errors, reset} = useForm({

    });

    const submit = (e) => {
        e.preventDefault();

    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Обратная связь</h2>}
        >
            <Head title="Feedback"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {
                            feedback.map((feedback_) => {
                                return (
                                    <div>
                                        <div className="feedBlock">
                                            <a href={route('anotherProfile', feedback_.user_id)} className={"FeedbackName bg-blue-300"}>{feedback_.name}</a>
                                            <br/>
                                            <span className={"FeedbackMsg "}>{feedback_.message}</span>

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
