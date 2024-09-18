



import { 
    ImageContainer,
    Label,
    SocialMedia,
    SocialMediaEntity,
    SocialMediaIcon,
    SocialMediaIcon2,
    StyledImage,
    ProfilePreviewWrapper, 

 } from './ProfilePreview.style'
 import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { IUser } from '../../../redux/types/Auth'
import { useState, useEffect } from 'react'
import { firebase } from '../../../firebase-config'
import { ImageSourcePropType } from 'react-native'

const fetchImage = async ( profileImageUrl: string ) => {
    try{
        const url = await firebase
        .storage()
        .ref(profileImageUrl as string)
        .getDownloadURL()
        return url
    }   
    catch(error) {
        console.error('Error fetching the image URL: ', error);
    }
} 

const ProfilePreviewComponent = ({ user }: { user: IUser }) => {

    const [fontLoaded, fontError] = useFonts({
        Poppins_300Light,
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
    })

    const [profileImage, setProfileImage] = useState<string | {uri: string} >(
            require('../../../assets/images/profile-img-placeholder.png')
    );

    useEffect(() => {
        if (user.profileImageUrl) {
            (
                async () => {
                    const uri = await fetchImage(user.profileImageUrl)
                    setProfileImage({uri} as {uri: string})
                }
            )()
        }
    }, [])

    if (!fontLoaded || fontError) {
        return (
            <></>
        )
    }

  return (
    <ProfilePreviewWrapper>
        <ImageContainer>
				<StyledImage source={profileImage as ImageSourcePropType}></StyledImage>
		</ImageContainer>
        <Label>Username: {user.username || 'none'}</Label>
        <Label>Fullname: {user.fullName || 'none'}</Label>
        <Label>Email: {user.emailAddress || 'none'}</Label>
        <Label>Bio: {user.bio || 'none'}</Label>
        <SocialMedia>
            <Label>Links:</Label>
            <SocialMediaEntity>
                <SocialMediaIcon
						name='twitter'
						color='#ffffffbd'
						size={40}
					/>
                <Label style={{ marginTop: 0, marginLeft: 25 }}>
                    {user.twitter || 'twitter'}
                </Label>
            </SocialMediaEntity>
            <SocialMediaEntity>
                <SocialMediaIcon
                    name='instagram'
                    color='#ffffffbd'
                    size={40}
                />
                <Label style={{ marginTop: 0, marginLeft: 25 }}>
                    {user.instagram || 'instagram'}
                </Label>
            </SocialMediaEntity>
            <SocialMediaEntity>
                <SocialMediaIcon2
                    name='web'
                    color='#ffffffbd'
                    size={40}
                />
                <Label style={{ marginTop: 0, marginLeft: 25 }}>
                    {user.website || 'website'}
                </Label>
            </SocialMediaEntity>
        </SocialMedia>
    </ProfilePreviewWrapper>
  )
}

export default ProfilePreviewComponent   