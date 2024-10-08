import { View, Text } from 'react-native'
import React from 'react'

import { ImageSourcePropType, Linking } from 'react-native';
import { useEffect, useState } from 'react';

import {
    Container,
    ImageContainer,
    Label,
    SocialMedia,
    SocialMediaEntity,
    SocialMediaIcon,
    SocialMediaIcon2,
    StyledImage
} from './ProfileDetails.style'

import { IUser } from '../../../redux/types/Auth';
import { firebase } from '../../../firebase-config'

const fetchImage = async (profileImgUrl: string) => {
	try {
		const url = await firebase.storage().ref(profileImgUrl).getDownloadURL();
		return url;
	} catch (err) {
		console.log(err);
	}
};

const ProfileDetails = ({ user }: { user: IUser }) => {
    const [profileImg, setProfileImg] = useState<string | { uri: string }>(
		require('../../../assets/images/profile-img-placeholder.png')
	);

	useEffect(() => {
		if (user.profileImageUrl) {
			async () => {
				const uri = await fetchImage(user.profileImageUrl);
				setProfileImg({ uri } as { uri: string });
			};
		}
	}, []);

	return (
		<Container>
			<ImageContainer>
				<StyledImage source={profileImg as ImageSourcePropType} />
			</ImageContainer>
			<Label>{user?.username || 'none'}</Label>
			{user?.bio && <Label>{user.bio}</Label>}
			<SocialMedia>
				<SocialMediaEntity
					testID='twitter-icon'
					onPress={() =>
						Linking.openURL(`https://user.twitter/${user.twitter}`)
					}
				>
					<SocialMediaIcon
						name='twitter'
						size={40}
						color='#ffffffbd'
					/>
				</SocialMediaEntity>
				<SocialMediaEntity
					testID='web-icon'
					onPress={() => Linking.openURL(user.website)}>
					<SocialMediaIcon2
						name='web'
						size={40}
						color='#ffffffbd'
					/>
				</SocialMediaEntity>
				<SocialMediaEntity
					testID='instagram-icon'
					onPress={() =>
						Linking.openURL(`https://instagram.com/${user.instagram}`)
					}
				>
					<SocialMediaIcon
						name='instagram'
						size={40}
						color='#ffffffbd'
					/>
				</SocialMediaEntity>
			</SocialMedia>
		</Container>
	);
}

export default ProfileDetails