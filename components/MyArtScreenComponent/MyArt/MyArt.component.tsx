import { View, Text } from 'react-native'
import React from 'react'

import {
    AllArtWrapper,
    ArtImage,
    ImagesWrapper,
    LinkWrapper,
    MyArtWrapper,
    SectionTitle,
    SoldArtWrapper,
    SoldOverlay
} from './MyArt.style'

import { useFonts, Questrial_400Regular } from '@expo-google-fonts/questrial';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

// const images = [
// 	{
// 		href: 'https://www.google.com/',
// 		src: require('../../../assets/images/nft1.png'),
// 	},
// 	{
// 		href: 'https://www.google.com/',
// 		src: require('../../../assets/images/nft2.png'),
// 	},
// 	{
// 		href: 'https://www.google.com/',
// 		src: require('../../../assets/images/nft1.png'),
// 	},
// 	{
// 		href: 'https://www.google.com/',
// 		src: require('../../../assets/images/nft2.png'),
// 	},
// ];

const MyArt = () => {
  
	const username = useSelector((state: RootState) => state.auth.username)
	const [images, setImages] = useState<{
		currentOwner: string;
		href: string;
		src: {
			uri: string
		}
	}[]>([])

    const [fontLoaded, fontError] = useFonts({
        Questrial_400Regular,
    })
    
	useEffect(() => {
		const fetchArt = async () => {
			const db = getFirestore();
			const artQuery = collection(db, 'art');
			const q = query(artQuery, where('creator', '==', username));

			const querySnapshot = await getDocs(q);
			const storage = getStorage();

			const imageUrls = await Promise.all(
				querySnapshot.docs.map(async (doc) => {
					const { imageUrl, currentOwner } = doc.data();
					const imageRef = ref(storage, imageUrl);
					const downloadUrl = await getDownloadURL(imageRef);
					return {
						currentOwner,
						href: downloadUrl,
						src: {
							uri: downloadUrl,
						},
					};
				})
			);

			console.log(imageUrls);
			setImages(imageUrls);
		};

		fetchArt().catch(console.error);
	}, [])

    if (!fontLoaded || fontError) {
        return null
    }

    return (
        <MyArtWrapper>
            <AllArtWrapper>
				<SectionTitle>All</SectionTitle>
				<ImagesWrapper>
					{images.map((image, index) => (
						<LinkWrapper
							onPress={() => console.log(image.href)}
							key={index}
						>
							<ArtImage source={image.src} />
						</LinkWrapper>
					))}
				</ImagesWrapper>
			</AllArtWrapper>
			<SoldArtWrapper>
				<SectionTitle>Sold</SectionTitle>
				<ImagesWrapper>
					{images.filter( image => image.currentOwner !== username ).map((image, index) => (
						<LinkWrapper
							onPress={() => console.log(image.href)}
							key={index}
						>
							<ArtImage source={image.src} />
							<SoldOverlay
								source={require('../../../assets/images/sold.png')}
							/>
						</LinkWrapper>
					))}
				</ImagesWrapper>
			</SoldArtWrapper>
        </MyArtWrapper>
  )
}

export default MyArt