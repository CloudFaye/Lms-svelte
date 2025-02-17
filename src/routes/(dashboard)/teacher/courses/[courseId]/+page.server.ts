import DescriptionForm from "$lib/components/DescriptionForm.svelte";
import { descriptionSchema, titleSchema } from "$lib/schema.js";
import { type Category, type Course } from "$lib/types.js";
import { error, redirect } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";



export const load = async ({params, locals: {user, pb}}) => {
    const {courseId} = params
    const userId = user?.id
    if(!user?.id){
        redirect (303, '/');
    }
    async function getCourse () {
        try {
            const course = await pb.collection('courses').getOne<Course>(courseId, {
                expand:'category, attachment(course), chapter(course)'
            });
            if(course.imageUrl){
                const imageUrl = pb.files.getURL(course, course.imageUrl)
                course.imageUrl = imageUrl
            }

            return course
        } catch (e) {
            const {status} = e as ClientResponseError
            //if (status === 404) error(404, 'course does not exist')
                redirect (303, '/');
            
        };
        
    };

    async function getCategories () {

        try {
            const categories = await pb.collection('categories').getFullList<Category>({
                sort:'-created'
            })

            return categories 
        } catch (e) {
            const {status} = e as ClientResponseError
            if (status === 404) redirect(303, '/')
            
            
            
        };
        
    };

    const [course, categories] = await Promise.all([getCourse(), getCategories()]);
    const titleForm = await superValidate(course, zod(titleSchema));
    const descriptionForm = await superValidate(course, zod(descriptionSchema));
    return {
        course,
        categories,
        titleForm,
        descriptionForm
    };
}; 

export const actions = {
    updateTitle: async (event) => {
        const {locals: { pb }, params} = event
        const {courseId} = params
        const form = await superValidate(event, zod(titleSchema))
        if (!form.valid){
            return fail (400, {
                form
            });
        }

        try {
           await pb.collection('courses').update(courseId, form.data) 
           return message(form, 'Bam! Title changed successfully')
        } catch (e) {
            const  {message:errorMessage} = e as ClientResponseError;
            return message(form, errorMessage, {
                status:400

            });
            
        }
    }
}