# React Native Modal WalkThrough
A modal to walk through different steps in react native

## Installation
Install with yarn or npm
```
yarn add react-native-modal-walk-through
```

Import the lib
```
import ModalWalkThrough from 'react-native-modal-walk-through';
```

Add scenes
```
<ModalWalkThrough
  visible={true}
>
  {['scene1', 'scene2'].map(scene => (
    <View>
      <Text>{scene}</Text>
    </View>
  ))}
</ModalWalkThrough>
```

## Preview
![preview](https://media.giphy.com/media/eEiW40iWwaRtS/giphy.gif)

## Properties
|Property |Type       |Description                     |Default value       |
|---------|-----------|--------------------------------|--------------------|
|height   |Number     |Height of the walkthrough       |40% of screen height|
|width    |Number     |Width of the walkthrough        |80% of screen width |
|onFinish |Function   |When the user went throught the entire walkthrough|  |
|onStepChange|Function |When the user swiped to another step |              |
|visible  |Boolean    |Should the modal be visible?    |false               |

## Methods
### goToStep (step: Number)
Go to a particular step in the walkthrough,
in case the number is bigger than the last step index, it will close the modal