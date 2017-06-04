import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, FlatList, View, Dimensions, StyleSheet} from 'react-native';

/**
 * <ModalWalkThrough />
 * 
 * @returs {React.Component}
 */
class ModalWalkThrough extends Component {
    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        onStepChange: PropTypes.func,
        onFinish: PropTypes.func,
    };

    constructor() {
        super();

        this.goToStep = this.goToStep.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.renderChild = this.renderChild.bind(this);
    }

    /**
     * Height of the walkThrough / flatList
     * @return {Number|String} the height value
     */
    get height() {
        return this.props.height || '40%';
    }

    /**
     * Width of the walkThrough / flatList
     * @return {Number|String} the width value
     */
    get width() {
        return this.props.width || (Dimensions.get('window').width * 0.8);
    }

    componentWillMount() {
        this.state = {
            visible: this.props.visible
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.state.visible = nextProps.visible;
        }
    }

    /**
     * Go to a specific step in the walkthrough
     * @param {Number} [index=0] the index to scroll to
     * @returns {void}
     */
    goToStep(index = 0) {
        if (index > this.props.children.length - 1) {

            // In case of going beyond last step, close the modal
            this.setState({visible: false});

            // Trigger onFinish in case defined
            if (typeof this.props.onFinish === 'function') {
                this.props.onFinish();
            }
        } else {

            // Scroll the walkthrough to a specific step
            this.flatList.scrollToOffset({
                animated: true,
                offset: index * this.width
            });
        }
    }

    /**
     * Handle user scroll event
     * @param {Object} eventData 
     * @returns {void}
     */
    handleScroll(eventData) {
        
        // Only when onStepChange was defined
        if (typeof this.props.onStepChange === 'function') {
            const { x } = eventData.nativeEvent.contentOffset;
            const step = Math.round(x / this.width);

            // Trigger an onStepChange event with the current step
            this.props.onStepChange(step);
        }
    }

    render() {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={this.state.visible}
            >
                <View
                    style={style.overlay}
                >
                    <FlatList
                        data={this.props.children}
                        renderItem={this.renderChild}
                        horizontal={true}
                        style={[style.list, { maxHeight: this.height, width: this.width }]}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        ref={flatList => this.flatList = flatList}
                        onScroll={this.handleScroll}
                    />
                </View>
            </Modal>
        );
    }

    /**
     * Render child of the walkThrough
     * @param {Object} param0 Options param
     * @param {Object} param0.item Item component to render
     * @param {Nummber} param0.index Index of component
     * @returns {React.Component} component
     */
    renderChild({item, index}) {
        const {width} = Dimensions.get('window');

        return (
            <View
                key={index}
                style={[style.scene, { width: this.width }]}
            >
                {item}
            </View>
        );
    }
}

const style = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        backgroundColor: '#ffffff',
        borderRadius: 3
    },
    scene: {
        flex: 1
    }
});

export default ModalWalkThrough;
