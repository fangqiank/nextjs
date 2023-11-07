import { Webhook, WebhookRequiredHeaders } from "svix"
import {headers} from 'next/headers'
import {IncomingHttpHeaders} from 'http'
import { NextResponse } from "next/server"
import {
	addMemberToCommunity,
	createCommunity,
	deleteCommunity,
	removeUserFromCommunity,
	updateCommunityInfo
} from '@/lib/actions/community.actions'

type EventType = 
	| "organization.created"
	| "organizationInvitation.created"
	| "organizationMembership.created"
	| "organizationMembership.deleted"
	| "organization.updated"
	| "organization.deleted"

	type Event = {
		data: Record<string, string | number | Record<string, string>[]>,
		object: 'event',
		type: EventType
	}

	export const POST =async (req: Request) => {
		const payload = await req.json()

		const header = headers()

		const heads = {
			'svix-id': header.get('svix-id'),
			'svix-timestamp': header.get('svix-timestamp'),
			'svix-signature': header.get('svix-signature')
		}

		const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || '')

		let evt: Event | null = null

		try{
			evt = wh.verify(
				JSON.stringify(payload),
				heads as IncomingHttpHeaders & WebhookRequiredHeaders
			) as Event
		}catch(err){
			return NextResponse.json(
				{
					message: err,
				}, 
				{
					status: 400
				}
			)
		}

		const evtType: EventType = evt?.type

		if(evtType === 'organization.created'){
			const {id, name, slug, logo_url, image_url, created_by} = evt?.data ?? {}

			try{
				await createCommunity(
					// @ts-ignore
					id,
					name,
					slug,
					logo_url || image_url,
					'org bio',
					created_by
				)

				return NextResponse.json(
					{
						message: 'User created',
					}, 
					{
						status: 201
					}
				)
			}catch(err){
				console.log(err);

				return NextResponse.json(
					{
						message: 'Interal Server Error',
					},
					{
						status: 500
					}
				)
			}
		}

		if(evtType === 'organizationInvitation.created'){
			try{
				console.log('Invitation created', evt?.data);

				return NextResponse.json(
					{
						message: 'Invitation created'
					}, 
					{
						status: 201
					}
				)
			}catch(err){
				console.log(err)

				return NextResponse.json(
					{
						message: 'Internal Server Error'
					}, 
					{
						status: 500
					}
				)
			}
		}

		if (evtType === "organizationMembership.created") {
			try {
				const { organization, public_user_data } = evt?.data;
				console.log("created", evt?.data);
	
				// @ts-ignore
				await addMemberToCommunity(organization.id, public_user_data.user_id);
	
				return NextResponse.json(
					{ 
						message: "Invitation accepted" 
					},
					{ 
						status: 201 
					}
				)
			} catch (err) {
				console.log(err);
	
				return NextResponse.json(
					{ 
						message: "Internal Server Error" 
					},
					{ 
						status: 500 
					}
				)
			}
		}

		if(evtType === 'organizationMembership.deleted'){
			try{
				const {organization, public_user_data} = evt?.data
				console.log('removed', evt?.data);
				// @ts-ignore
				await removeUserFromCommunity(public_user_data.user_id, organization.id)

				return NextResponse.json(
					{
						message: 'Member removed'
					},
					{
						status: 204
					}
				)
			}catch(err){
				console.log(err);

				return NextResponse.json(
					{
						message: 'Internal Server Error'
					}, 
					{
						status: 500
					}
				)
			}
		}

		if(evtType === 'organization.updated'){
			try{
				const {id, logo_url, name, slug} = evt?.data
				console.log('updated', evt?.data);

				// @ts-ignore
				await updateCommunityInfo(id, name, slug, logo_url)

				return NextResponse.json(
					{
						message: 'Organization updated'
					}, 
					{
						status: 200
					}
				)
			}catch(err){
				console.log(err);

				return NextResponse.json(
					{ 
						message: "Internal Server Error" 
					},
					{ 
						status: 500 
					}
				)
			}
		}

		if(evtType === 'organization.deleted'){
			try{
				const {id} = evt?.data
				console.log('deleted', evt?.data);

				// @ts-ignore
				await deleteCommunity(id)

				return NextResponse.json(
					{
						message: 'organization deleted'
					},
					{
						status: 204
					}
				)
			}catch(err){
				console.log(err);

				return NextResponse.json(
					{
						message: 'Internal Server Error'
					},
					{
						status: 500
					}
				)
			}
		}
	}