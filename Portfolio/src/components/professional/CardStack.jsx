import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "motion/react";

const Card = ({ item, isTop, index, total, onSwipe, renderCard }) => {
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Map dragging distance to card rotation
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  
  // Fade card slightly as it is dragged far away
  const opacity = useTransform(
    x,
    [-200, -150, 0, 150, 200],
    [0.6, 0.9, 1, 0.9, 0.6]
  );

  const handleDragEnd = async (event, info) => {
    const swipeThreshold = 120;
    if (info.offset.x > swipeThreshold) {
      // Swipe Right animation
      await controls.start({
        x: 500,
        rotate: 30,
        opacity: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      });
      onSwipe();
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left animation
      await controls.start({
        x: -500,
        rotate: -30,
        opacity: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      });
      onSwipe();
    } else {
      // Bounce back to center
      controls.start({
        x: 0,
        rotate: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  const handleClick = async () => {
    if (!isTop) return;
    // Slide out to the right on click
    await controls.start({
      x: 500,
      rotate: 25,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    });
    onSwipe();
  };

  // Stacking parameters
  const stackOffset = index * 14; // vertical positioning offset
  const scale = 1 - index * 0.04; // scaling down for perspective
  const zIndex = total - index;   // z-index stacking order
  const cardOpacity = 1 - index * 0.15; // cards in background are dimmer

  useEffect(() => {
    if (isTop) {
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3 },
      });
    } else {
      controls.start({
        x: 0,
        y: stackOffset,
        rotate: index * 1.5 * (index % 2 === 0 ? 1 : -1),
        scale: scale,
        opacity: cardOpacity,
        transition: { duration: 0.3 },
      });
    }
  }, [isTop, index, controls]);

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      animate={controls}
      style={{
        x,
        rotate,
        opacity: isTop ? opacity : cardOpacity,
        zIndex,
        position: "absolute",
        width: "100%",
        cursor: isTop ? "grab" : "default",
      }}
      whileDrag={{ cursor: "grabbing" }}
      className="select-none touch-none"
    >
      {renderCard(item)}
    </motion.div>
  );
};

const CardStack = ({ items, renderCard, className = "" }) => {
  const [cards, setCards] = useState(items);

  // Sync state if items prop updates
  useEffect(() => {
    setCards(items);
  }, [items]);

  const rotateToBack = () => {
    setCards((prev) => {
      const copy = [...prev];
      const top = copy.shift();
      copy.push(top);
      return copy;
    });
  };

  return (
    <div className={`relative w-full max-w-2xl h-[420px] md:h-[380px] flex items-start justify-center ${className}`}>
      {cards.map((item, index) => {
        return (
          <Card
            key={item.id || index}
            item={item}
            isTop={index === 0}
            index={index}
            total={cards.length}
            onSwipe={rotateToBack}
            renderCard={renderCard}
          />
        );
      })}
    </div>
  );
};

export default CardStack;
