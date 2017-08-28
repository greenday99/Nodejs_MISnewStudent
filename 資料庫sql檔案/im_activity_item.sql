-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-06-13 08:48:24
-- 伺服器版本: 10.1.10-MariaDB
-- PHP 版本： 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `fju`
--

-- --------------------------------------------------------

--
-- 資料表結構 `im_activity_item`
--

CREATE TABLE `im_activity_item` (
  `IMACT_TYPE` varchar(10) NOT NULL,
  `ITEM_CODE` int(11) NOT NULL,
  `ITEM_URL` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `im_activity_item`
--

INSERT INTO `im_activity_item` (`IMACT_TYPE`, `ITEM_CODE`, `ITEM_URL`) VALUES
('A', 5, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12957635_1031059753596339_8756529380265274903_o.jpg'),
('A', 6, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12901520_1031059933596321_4564440566464008545_o.jpg'),
('A', 7, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12957687_1031060453596269_294684047706171557_o.jpg'),
('A', 8, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12983386_1031060786929569_5877634206598712968_o.jpg'),
('A', 9, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12983967_1031060886929559_2921872554113984140_o.jpg'),
('A', 10, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12916778_1031061103596204_1563427274687488776_o.jpg'),
('A', 11, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12916852_1031061290262852_4144590935384646659_o.jpg'),
('A', 12, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12977260_1031061450262836_5212226166194012056_o.jpg'),
('A', 13, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12973468_1031061906929457_6015469780319675083_o.jpg'),
('A', 14, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12973178_1031062070262774_6070711676513587893_o.jpg'),
('B', 15, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12888593_1019896138046034_8610294331047999349_o.jpg'),
('B', 16, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12795118_1019896081379373_4533025373559324252_o.jpg'),
('B', 17, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12885785_1019892628046385_2754319528288581422_o.jpg'),
('B', 18, 'https://scontent-tpe1-1.xx.fbcdn.net/v/l/t1.0-9/12439119_1019893234712991_1294490157197588117_n.jpg?oh=a586d595d21d0b57a3f555a2e1cf1dfa&oe=57C7317D'),
('B', 19, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/12246766_1019893454712969_1040268403609758300_n.jpg?oh=f25d06df5aced5a68dcac9e38afe345c&oe=57CE2631'),
('B', 20, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12719454_1019893678046280_8492219383048761394_o.jpg'),
('B', 21, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12898340_1019893891379592_8436809878355756838_o.jpg'),
('B', 22, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12885840_1019893944712920_854995591284228367_o.jpg'),
('B', 23, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1934638_1019894168046231_8264709574219100053_n.jpg?oh=82d541db15bcb704fe042ce89dd5f44b&oe=580E475E'),
('B', 24, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12901300_1019894188046229_3931600934690293934_o.jpg'),
('C', 25, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12339289_958939927474989_8708431907494561190_o.jpg'),
('C', 26, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12303987_958939987474983_446437772985242751_o.jpg'),
('C', 27, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/11228925_958940047474977_5058326705602086875_o.jpg'),
('C', 28, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12307968_958940117474970_2119779002338056845_o.jpg'),
('C', 29, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12307361_958940290808286_3714828180745491282_o.jpg'),
('C', 30, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12339441_958940317474950_125010891143838657_o.jpg'),
('C', 31, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12273573_958940537474928_7711856552709983263_o.jpg'),
('C', 32, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12291913_958940544141594_5446012981393315653_o.jpg'),
('C', 33, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12307595_958940620808253_5686849039212062949_o.jpg'),
('C', 34, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12314640_958940624141586_8134120279632391230_o.jpg'),
('D', 35, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12273645_955863531115962_7282695817069372840_o.jpg'),
('D', 36, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12304121_955863611115954_1558639347923920627_o.jpg'),
('D', 37, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12291983_955863644449284_3845617251248766667_o.jpg'),
('D', 38, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12308080_955863717782610_5072527665525177438_o.jpg'),
('D', 39, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12248168_955863801115935_6507154466288308976_o.jpg'),
('D', 40, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12307418_955863894449259_3085111975606848057_o.jpg'),
('D', 41, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12310049_955863994449249_8695619738800220122_o.jpg'),
('D', 42, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12303993_955864017782580_8664426452649438701_o.jpg'),
('D', 43, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12304033_955864021115913_978993289008424320_o.jpg'),
('D', 44, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12304312_955864031115912_2324138366728199787_o.jpg'),
('E', 45, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12087766_938475099521472_8909447251110747785_o.jpg'),
('E', 46, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12095157_938476142854701_7602677494767554877_o.jpg'),
('E', 47, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12109948_938476666187982_3122124118838500676_o.jpg'),
('E', 48, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/11148558_938600519508930_613343039867582791_o.jpg'),
('E', 49, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12109762_938601789508803_6264235231567888174_o.jpg'),
('E', 50, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12091361_938601562842159_5082980471796303334_o.jpg'),
('E', 51, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12052383_938602359508746_7743937921040087269_o.jpg'),
('E', 52, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12080390_938602419508740_6465692177430956227_o.jpg'),
('E', 53, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12139922_938602999508682_8280736076064420808_o.jpg'),
('E', 54, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12109907_939575602744755_935548289696278095_o.jpg'),
('F', 57, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12068801_938125626223086_5884057441997151397_o.jpg'),
('F', 58, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12094916_938127006222948_4100272390855678803_o.jpg'),
('F', 59, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12109766_938127402889575_1179251019684147733_o.jpg'),
('F', 60, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12110016_938127999556182_2507739947001587314_o.jpg'),
('F', 61, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12080281_938129596222689_4258628301317517534_o.jpg'),
('F', 62, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12140009_938129862889329_7286386363359445493_o.jpg'),
('F', 63, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12132433_938130036222645_1434472935483774949_o.jpg'),
('F', 64, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12079840_938133466222302_220695968034376690_o.jpg'),
('G', 65, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12109963_937738999595082_7934369656621994197_o.jpg'),
('G', 66, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12079969_937739212928394_8642008409509565661_o.jpg'),
('G', 67, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12069012_937740102928305_3513015427494224920_o.jpg'),
('G', 68, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/11703481_937740996261549_3224771207516901664_o.jpg'),
('G', 69, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12080258_937741669594815_8270473237667374085_o.jpg'),
('G', 70, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12080046_937742192928096_6913386805517989400_o.jpg'),
('G', 71, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12068796_937743156261333_5865412958281283242_o.jpg'),
('G', 72, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12138573_937743299594652_6995641274585237328_o.jpg'),
('G', 73, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12140884_937743716261277_1823167488096277247_o.jpg'),
('G', 74, 'https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12017707_937905142911801_6754772198464317648_o.jpg'),
('H', 75, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1239919_583607591674893_1769525350_n.jpg?oh=a2babeb5b3d33b83a002a57c371c44b7&oe=580419D6'),
('H', 76, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1239785_583608615008124_685962734_n.jpg?oh=931d6531749cbc6845aede58fc6c01e1&oe=58026FDF'),
('H', 77, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1234039_583608765008109_1546170215_n.jpg?oh=9f9aff5f676cc5c4a65176ac32a2ae77&oe=57C4E57E'),
('H', 78, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1235167_583609171674735_1786167564_n.jpg?oh=e99d2b4bdd5b1fbe827f16a76c1d8ad7&oe=5806879A'),
('H', 79, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/532074_583609208341398_1460667837_n.jpg?oh=1ef9ac17186b49d6ad2529fcaa4c4e6f&oe=5807907F'),
('H', 80, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1174679_583609458341373_562349443_n.jpg?oh=33546612d7bd4b185b32ca4c0d802c5d&oe=58056287'),
('H', 81, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1234998_583607785008207_1588737483_n.jpg?oh=344c39951a3d28639613ac44380126e6&oe=580FD564'),
('H', 82, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/1378385_583608015008184_2114190902_n.jpg?oh=d98a16fbf0d723778a2a99d174c086de&oe=57C26E0A'),
('H', 83, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/531955_583607065008279_508549254_n.jpg?oh=8df639588531e38f152975bcd24968e0&oe=580841FA'),
('H', 84, 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/993406_583607308341588_918150779_n.jpg?oh=8ab484c1ed54edff5714db9ccafe35b8&oe=57D407C1');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `im_activity_item`
--
ALTER TABLE `im_activity_item`
  ADD PRIMARY KEY (`ITEM_CODE`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `im_activity_item`
--
ALTER TABLE `im_activity_item`
  MODIFY `ITEM_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
