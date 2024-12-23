import { titleSchema } from "$lib/schema";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters"
import { fail } from "sveltekit-superforms";
import type { ClientResponseError, RecordModel } from "pocketbase";
import { redirect } from "@sveltejs/kit";

export const load = (async () => {
    return {
        form: await superValidate(zod(titleSchema))
    };
});



export const actions = {
    default: async (event) => {
        const { locals: { pb, user } } = event

        const form = await superValidate(event, zod(titleSchema))

        if(!form.valid){
            return fail(400, {form}

            )
        }

        let courseRecord : RecordModel
        try{
            courseRecord = await pb.collection('courses').create({...form.data, user:user?.id})
        } catch (error) {
            const { message:errorMessage } = error as ClientResponseError
            return message(form, errorMessage, { status: 400})
        }

        redirect(303, `/teacher/courses/${courseRecord.id}`)
    }
}