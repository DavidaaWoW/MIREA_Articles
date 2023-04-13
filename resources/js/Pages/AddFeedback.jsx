import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {useEffect} from "react";

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
