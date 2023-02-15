import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack bg={'white'} borderRadius={'10px'} align='left'>
      <Image borderRadius={'10px 10px 10px 10px'} src={imageSrc} />
      <Heading color='black' size="md" padding={5}>{title}</Heading>
      <Text color='black' opacity={0.6} paddingX={5}>{description}</Text>
      <HStack paddingX={5} paddingY={2}>
        <Text color={"black"}>See more</Text>
        <FontAwesomeIcon size="1x" color="black" icon={faArrowRight} />
      </HStack>
    </VStack >
  );
};

export default Card;
